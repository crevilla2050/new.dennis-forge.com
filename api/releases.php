<?php
declare(strict_types=1);

const GITHUB_RELEASES_URL = 'https://api.github.com/repos/crevilla2050/string-audit/releases?per_page=3';
const CACHE_TTL_SECONDS = 900;

function send_json(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: public, max-age=300');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function cache_path(): string
{
    return rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
        . DIRECTORY_SEPARATOR
        . 'dennis-forge-github-releases.json';
}

function read_cache(string $path): ?array
{
    if (!is_file($path)) {
        return null;
    }

    $json = file_get_contents($path);
    $cache = is_string($json) ? json_decode($json, true) : null;

    return is_array($cache) && isset($cache['fetched_at'], $cache['releases'])
        && is_array($cache['releases'])
        ? $cache
        : null;
}

function normalize_releases(array $releases): array
{
    $normalized = [];

    foreach ($releases as $release) {
        if (!is_array($release) || !empty($release['draft'])) {
            continue;
        }

        $normalized[] = [
            'name' => (string) ($release['name'] ?: $release['tag_name'] ?? 'Release'),
            'tag_name' => (string) ($release['tag_name'] ?? ''),
            'published_at' => (string) ($release['published_at'] ?? ''),
            'body' => (string) ($release['body'] ?? ''),
            'html_url' => (string) ($release['html_url'] ?? ''),
        ];
    }

    return $normalized;
}

function fetch_releases(): ?array
{
    $curl = curl_init(GITHUB_RELEASES_URL);

    if ($curl === false) {
        return null;
    }

    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_TIMEOUT => 8,
        CURLOPT_HTTPHEADER => [
            'Accept: application/vnd.github+json',
            'User-Agent: Dennis-Forge-website',
        ],
    ]);

    $body = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    curl_close($curl);

    if (!is_string($body) || $status !== 200) {
        return null;
    }

    $releases = json_decode($body, true);

    return is_array($releases) ? normalize_releases($releases) : null;
}

$cacheFile = cache_path();
$cache = read_cache($cacheFile);
$now = time();

if ($cache !== null && $cache['fetched_at'] + CACHE_TTL_SECONDS > $now) {
    send_json(['releases' => $cache['releases'], 'cached' => true]);
}

$releases = fetch_releases();

if ($releases !== null) {
    $cache = ['fetched_at' => $now, 'releases' => $releases];
    $temporaryFile = $cacheFile . '.' . getmypid() . '.tmp';
    file_put_contents($temporaryFile, json_encode($cache), LOCK_EX);
    rename($temporaryFile, $cacheFile);

    send_json(['releases' => $releases, 'cached' => false]);
}

if ($cache !== null) {
    send_json(['releases' => $cache['releases'], 'cached' => true, 'stale' => true]);
}

send_json(['releases' => [], 'error' => 'Release updates are temporarily unavailable.'], 503);
