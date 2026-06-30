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
                    <a href="get-started.html">
                        Get Started
                    </a>
                </li>

                <li>
                    <a href="index.html#pricing-preview">
                        Pricing
                    </a>
                </li>

                <li>
                    <a href="faq.html">
                        FAQs
                    </a>
                </li>

                <li>
                    <a href="founders.html">
                        Founders
                    </a>
                </li>

            </ul>

            <a
                href="#"
                class="btn primary forge-register">
                Create Account
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