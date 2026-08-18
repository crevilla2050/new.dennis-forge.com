class DennisHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<header class="site-header">

    <div class="container nav-container">

        <a href="index-es.html" class="logo">
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
                    <a href="index-es.html">
                        Inicio
                    </a>
                </li>

                <li>
                    <a href="index-es.html#workflow">
                        Cómo funciona
                    </a>
                </li>

                <li>
                    <a href="index-es.html#the-forge">
                        La Forjaduría
                    </a>
                </li>

                <li>
                    <a href="index-es.html#pricing-preview">
                        Precios
                    </a>
                </li>

                <li>
                    <a href="founders-es.html">
                        Fundadores
                    </a>
                </li>
            </ul>

            <a
                href="get-started-es.html"
                class="btn primary forge-register">
                Comenzar
            </a>

        </nav>

        <div class="language-switcher">

            <a href="index.html">EN</a>
            <a href="index-es.html" class="active">ES</a>
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