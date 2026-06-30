class DennisFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<footer>

    <div class="container">

        <p>
            Built with ❤️ in Oaxaca and a little bit of Köln.
        </p>

        <p>
            © 2026 Dennis Forge.
            All rights reserved.
        </p>

    </div>

</footer>
`;
    }
}

customElements.define(
    "dennis-footer",
    DennisFooter
);