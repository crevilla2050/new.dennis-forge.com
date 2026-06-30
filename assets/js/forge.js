window.Dennis = {

    repoUrl() {

        const host =
            window.location.hostname;

        if (
            host === "localhost" ||
            host === "127.0.0.1" ||
            host.endsWith(".local")
        ) {
            return "http://localhost:5173";
        }

        return "https://repo.dennis-forge.com";
    }
};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .querySelectorAll(
                ".forge-register"
            )
            .forEach(el => {

                el.href =
                    Dennis.repoUrl() +
                    "/#register";
            });

        document
            .querySelectorAll(
                ".forge-login"
            )
            .forEach(el => {

                el.href =
                    Dennis.repoUrl() +
                    "/#login";
            });

    }
);