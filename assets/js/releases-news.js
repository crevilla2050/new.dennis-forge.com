(function () {
    "use strict";

    const releasesUrl = new URL("api/releases.php", document.baseURI).href;
    const copy = {
        en: {
            heading: "Latest releases & news",
            subtitle: "Follow Dennis Forge development: the newest published releases and updates from the forge.",
            releases: "Latest releases",
            releasesDescription: "Published from the Dennis Forge GitHub repository.",
            loading: "Loading releases…",
            unavailable: "Release updates are temporarily unavailable.",
            empty: "No releases have been published yet.",
            allReleases: "View all releases",
            news: "From the forge",
            newsDescription: "Latest posts from @dennistheforge.",
            posts: "Posts by @dennistheforge",
            follow: "Follow @dennistheforge",
            notes: "View release notes",
        },
        es: {
            heading: "Últimas versiones y noticias",
            subtitle: "Sigue el desarrollo de Dennis Forge: las versiones publicadas más recientes y las novedades de la forja.",
            releases: "Últimas versiones",
            releasesDescription: "Publicadas desde el repositorio de Dennis Forge en GitHub.",
            loading: "Cargando versiones…",
            unavailable: "Las actualizaciones de versiones no están disponibles temporalmente.",
            empty: "Aún no se han publicado versiones.",
            allReleases: "Ver todas las versiones",
            news: "Desde la forja",
            newsDescription: "Últimas publicaciones de @dennistheforge.",
            posts: "Publicaciones de @dennistheforge",
            follow: "Seguir a @dennistheforge",
            notes: "Ver notas de la versión",
        },
        de: {
            heading: "Neueste Veröffentlichungen & Nachrichten",
            subtitle: "Verfolgen Sie die Entwicklung von Dennis Forge: die neuesten Veröffentlichungen und Neuigkeiten aus der Schmiede.",
            releases: "Neueste Veröffentlichungen",
            releasesDescription: "Veröffentlicht im Dennis-Forge-Repository auf GitHub.",
            loading: "Veröffentlichungen werden geladen…",
            unavailable: "Veröffentlichungsupdates sind vorübergehend nicht verfügbar.",
            empty: "Es wurden noch keine Veröffentlichungen publiziert.",
            allReleases: "Alle Veröffentlichungen ansehen",
            news: "Aus der Schmiede",
            newsDescription: "Neueste Beiträge von @dennistheforge.",
            posts: "Beiträge von @dennistheforge",
            follow: "@dennistheforge folgen",
            notes: "Versionshinweise ansehen",
        },
    };

    function formatDate(value) {
        return new Intl.DateTimeFormat(document.documentElement.lang || "en", {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(new Date(value));
    }

    function releaseSummary(body) {
        const text = (body || "")
            .replace(/\s+/g, " ")
            .trim();

        return text.length > 160 ? `${text.slice(0, 157)}…` : text;
    }

    function renderRelease(release, labels) {
        const link = document.createElement("a");
        const title = document.createElement("span");
        const name = document.createElement("span");
        const icon = document.createElement("i");
        const date = document.createElement("time");
        const summary = document.createElement("span");

        link.className = "release-item";
        link.href = release.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        title.className = "release-item-title";
        name.textContent = release.name || release.tag_name;
        icon.className = "bi bi-arrow-up-right";
        icon.setAttribute("aria-hidden", "true");
        title.append(name, icon);

        date.dateTime = release.published_at;
        date.textContent = formatDate(release.published_at);

        summary.className = "release-item-summary";
        summary.textContent = releaseSummary(release.body) || labels.notes;

        link.append(title, date, summary);
        return link;
    }

    async function loadReleases(releasesContainer, labels) {
        try {
            const response = await fetch(releasesUrl, {
                headers: { Accept: "application/vnd.github+json" },
            });

            if (!response.ok) {
                throw new Error(`GitHub returned ${response.status}`);
            }

            const payload = await response.json();
            const releases = Array.isArray(payload.releases) ? payload.releases : [];

            releasesContainer.replaceChildren();

            if (!releases.length) {
                const empty = document.createElement("p");
                empty.className = "updates-status";
                empty.textContent = labels.empty;
                releasesContainer.append(empty);
                return;
            }

            releases.forEach((release) => {
                releasesContainer.append(renderRelease(release, labels));
            });
        } catch (error) {
            releasesContainer.replaceChildren();
            const fallback = document.createElement("p");
            fallback.className = "updates-status";
            fallback.textContent = labels.unavailable;
            releasesContainer.append(fallback);
        }
    }

    function loadXTimeline() {
        const existing = document.querySelector(
            'script[src="https://platform.twitter.com/widgets.js"]'
        );

        if (existing) {
            return;
        }

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://platform.twitter.com/widgets.js";
        script.charset = "utf-8";
        document.head.append(script);
    }

    class DennisReleaseNews extends HTMLElement {
        connectedCallback() {
            const locale = (this.getAttribute("locale") || document.documentElement.lang || "en")
                .toLowerCase()
                .split("-")[0];
            const labels = copy[locale] || copy.en;

            this.innerHTML = `
                <section id="latest-news" class="section">
                    <div class="container">
                        <h2>${labels.heading}</h2>
                        <p class="section-subtitle">${labels.subtitle}</p>
                        <div class="updates-grid">
                            <article class="updates-card">
                                <div class="updates-card-heading">
                                    <i class="bi bi-github" aria-hidden="true"></i>
                                    <div>
                                        <h3>${labels.releases}</h3>
                                        <p>${labels.releasesDescription}</p>
                                    </div>
                                </div>
                                <div class="release-list" aria-live="polite">
                                    <p class="updates-status">${labels.loading}</p>
                                </div>
                                <a class="updates-link" href="https://github.com/crevilla2050/string-audit/releases">
                                    ${labels.allReleases} <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
                                </a>
                            </article>
                            <article class="updates-card">
                                <div class="updates-card-heading">
                                    <i class="bi bi-twitter-x" aria-hidden="true"></i>
                                    <div>
                                        <h3>${labels.news}</h3>
                                        <p>${labels.newsDescription}</p>
                                    </div>
                                </div>
                                <div class="x-timeline-wrap">
                                    <a class="twitter-timeline" data-theme="dark" data-height="520" data-dnt="true" data-lang="${locale}" href="https://x.com/dennistheforge">${labels.posts}</a>
                                </div>
                                <a class="updates-link" href="https://x.com/dennistheforge">
                                    ${labels.follow} <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
                                </a>
                            </article>
                        </div>
                    </div>
                </section>`;

            loadReleases(this.querySelector(".release-list"), labels);
            loadXTimeline();
        }
    }

    customElements.define("dennis-release-news", DennisReleaseNews);
}());
