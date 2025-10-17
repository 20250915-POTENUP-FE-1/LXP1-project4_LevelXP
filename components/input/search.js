class InputSearch extends HTMLElement {
  connectedCallback() {
    const placeholder =
      this.getAttribute("placeholder") || "우리는 집에가고 싶습니다.";

    this.innerHTML = `
      <head>
        <link rel="stylesheet" href="/css/search.css" />
        </head>
        <body>
    <div id="search-site">
      <input
        type="search"
        class="search"
        placeholder="${placeholder}"
      />
      <button class="wrap">검색</button>
    </div>
  </body>`;
  }
}
customElements.define("input-search", InputSearch);
export { InputSearch };
