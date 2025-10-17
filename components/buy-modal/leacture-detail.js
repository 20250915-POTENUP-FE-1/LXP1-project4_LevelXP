class LeactureDetail extends HTMLElement {
  connectedCallback() {
    const title =
      this.getAttribute("title") || "Next.js 15: Full-Stack Development";
    const price = this.getAttribute("price") || "￦1,000,000,000";

    this.innerHTML = `
      <head>
    <link rel="stylesheet" href="/css/lectrue-detail.css" />
  </head>

  <body>
    <h3 class="title">${title}</h3>

    <p id="content-book" class="content-book">
      전통적인 React 개발 방식과 Next.js를 이용해서 개발하는 방식은 전혀
      다릅니다. 이 강의는 최신 Next.js 15의 핵심을 꿰뚫고, '진짜' Next.js다운
      개발 방식을 알려드립니다. 취업 포트폴리오부터 실무 프로젝트까지, 성능과
      효율을 모두 잡는 방법을 경험하세요.
    </p>

    <p class="modal-buy">강의를 구매하시겠습니까?</p>
    <div class="bottom">
      <p class="price">${price}</p>
      <div class="btn-wrap">
        <button class="btn-confirm" type="button">확인</button>
        <button class="btn-cancel" type="button">취소</button>
      </div>
    </div>
  </body>`;
  }
}
customElements.define("modal-buy-detail", LeactureDetail);
export { LeactureDetail };
