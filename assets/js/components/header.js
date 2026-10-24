class DennisHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<header class="site-header">

    <div class="container nav-container">

        <a href="index.html" class="logo">
            <img
                src="assets/img/logo.png"
                alt="Dennis Forge"
                class="sidebar-logo"
            >
            <span>Dennis Forge</span>
        </a>

        <!-- MOBILE MENU BUTTON -->
        <button
            class="mobile-menu-toggle"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded="false"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>

        <nav class="main-navigation">

            <ul class="nav-links">

                <li>
                    <a href="index.html">
                        Home
                    </a>
                </li>

                <li>
                    <a href="index.html#how-it-works.html">
                        How It Works
                    </a>
                </li>

                <li>
                    <a href="https://repo.dennis-forge.com">
                        The Forge
                    </a>
                </li>

                <li>
                    <a href="pricing.html">
                        Pricing
                    </a>
                </li>

                <li>
                    <a href="founders.html">
                        Founders
                    </a>
                </li>

                <li>
                    <a href="use-cases.html">
                        Use Cases
                    </a>
                </li>

                <li>
                    <a href="contact.html">
                        Contact
                    </a>
                </li>

            </ul>

            <a
                href="get-started.html"
                class="btn primary forge-register"
            >
                Get Started
            </a>

        </nav>

        <div class="language-switcher">

            <a href="index.html" class="active">EN</a>
            <a href="index-es.html">ES</a>
            <a href="index-de.html">DE</a>

        </div>

    </div>

</header>

<style>

/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */

/*
 * Desktop:
 * Keep the existing navigation exactly as normal.
 */

.mobile-menu-toggle {
    display: none;
}


/*
 * Narrow screens
 */

@media (max-width: 768px) {

    /*
     * Keep the header itself fixed at the top.
     *
     * This is intentionally only enabled on narrow screens,
     * so desktop behavior remains untouched.
     */

    .site-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        width: 100%;
    }

    /*
     * Compact menu button.
     */

    .mobile-menu-toggle {
        display: flex;

        position: fixed;
        top: 12px;
        left: 12px;

        width: 42px;
        height: 42px;

        padding: 8px;

        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;

        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 6px;

        background: rgba(255, 255, 255, 0.96);

        cursor: pointer;

        z-index: 10001;

        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .mobile-menu-toggle span {
        display: block;

        width: 22px;
        height: 2px;

        background: currentColor;

        transition:
            transform 0.2s ease,
            opacity 0.2s ease;
    }


    /*
     * Navigation is hidden by default.
     *
     * It occupies no more than 60% of the viewport width.
     */

    .main-navigation {
        display: none;

        position: fixed;
        top: 0;
        left: 0;

        width: min(60vw, 320px);
        max-width: 60vw;
        min-height: 100vh;

        padding: 70px 20px 30px 20px;

        background:
            linear-gradient(
                135deg,
                rgba(20, 28, 45, 0.94),
                rgba(35, 55, 75, 0.88)
            );

        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);

        border-right: 1px solid rgba(255, 255, 255, 0.18);

        box-shadow:
            6px 0 30px rgba(0, 0, 0, 0.30);

        overflow-y: auto;

        z-index: 10000;
    }

    .main-navigation .nav-links a {
        display: block;

        width: 100%;

        padding: 13px 8px;

        color: rgba(255, 255, 255, 0.92);

        text-align: left;
        text-decoration: none;

        border-radius: 6px;

        transition:
            background 0.2s ease,
            color 0.2s ease;
    }

    .main-navigation .nav-links a:hover,
    .main-navigation .nav-links a:focus {
        color: #ffffff;

        background: rgba(255, 255, 255, 0.12);
    }

    /*
     * Open state.
     */

    .main-navigation.mobile-open {
        display: block;
    }


    /*
     * Vertical, left-aligned menu.
     */

    .main-navigation .nav-links {
        display: flex;

        flex-direction: column;

        align-items: flex-start;

        justify-content: flex-start;

        width: 100%;

        margin: 0;
        padding: 0;

        list-style: none;
    }

    .main-navigation .nav-links li {
        width: 100%;

        margin: 0;
        padding: 0;
    }

    .main-navigation .nav-links a {
        display: block;

        width: 100%;

        padding: 12px 5px;

        text-align: left;

        text-decoration: none;
    }


    /*
     * Get Started remains part of the mobile menu.
     */

    .main-navigation .forge-register {
        display: block;

        width: 100%;

        margin-top: 18px;

        text-align: center;
    }


    /*
     * Language selector becomes vertical too.
     */

    .language-switcher {
        display: none;
    }


    /*
     * The logo is hidden on narrow screens.
     *
     * The menu button is the persistent navigation handle.
     */

    .site-header .logo {
        display: none;
    }


    /*
     * Turn the hamburger into an X when open.
     */

    .mobile-menu-toggle.mobile-open span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }

    .mobile-menu-toggle.mobile-open span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-toggle.mobile-open span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }


    /*
     * Prevent page content from hiding underneath the fixed header.
     */

    body {
        padding-top: 60px;
    }
}

</style>
`;

        const toggle = this.querySelector(".mobile-menu-toggle");
        const navigation = this.querySelector(".main-navigation");

        if (!toggle || !navigation) {
            return;
        }

        toggle.addEventListener("click", () => {

            const isOpen =
                navigation.classList.toggle("mobile-open");

            toggle.classList.toggle(
                "mobile-open",
                isOpen
            );

            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            toggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });


        /*
         * Close the mobile menu after selecting a link.
         */

        navigation
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    navigation.classList.remove(
                        "mobile-open"
                    );

                    toggle.classList.remove(
                        "mobile-open"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    toggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );
                });
            });
    }
}

customElements.define(
    "dennis-header",
    DennisHeader
);