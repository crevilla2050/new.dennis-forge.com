class DennisFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<footer>

    <div class="container">

        <p>
            Hecho con ❤️ en Oaxaca y un poquito de Köln.
            Et hätt noch immer jot jejange.
        </p>

        <p>
            © 2026 Dennis Forge.
            Todos los derechos reservados.
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