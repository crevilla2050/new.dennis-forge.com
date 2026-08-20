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

        <nav>

            <ul class="nav-links">

                <li>
                    <a href="index.html">
                        Home
                    </a>
                </li>

                <li>
                    <a href="index.html#workflow">
                        How It Works
                    </a>
                </li>

                <li>
                    <a href="index.html#the-forge">
                        The Forge
                    </a>
                </li>

                <li>
                    <a href="index.html#pricing-preview">
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

            </ul>

            <a
                href="get-started.html"
                class="btn primary forge-register"
                target="_blank"
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
`;
    }
}

customElements.define(
    "dennis-header",
    DennisHeader
);