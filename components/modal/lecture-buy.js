class LectureDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.handleKeydown = this.handleKeydown.bind(this); // ESC 이벤트용
  }

  connectedCallback() {
    const title =
      this.getAttribute("title") || "Next.js 15: Full-Stack Development";
    const detail =
      this.getAttribute("detail") ||
      "전통적인 React 개발 방식과 Next.js를 이용해서 개발하는 방식은 전혀 다릅니다. 이 강의는 최신 Next.js 15의 핵심을 꿰뚫고, '진짜' Next.js다운 개발 방식을 알려드립니다. 취업 포트폴리오부터 실무 프로젝트까지, 성능과 효율을 모두 잡는 방법을 경험하세요.";
    const price = this.getAttribute("price") || "1,000,000,000";

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/lectrue-buy.css" />
      <div class="modal-backdrop">
        <div class="lectrue-buy">
          <h1 class="title">${title}</h1>
          <p class="detail">${detail}</p>
          <p class="price">${price}원</p>
          <div class="btn-group">
            <button class="btn-confirm" type="button">확인</button>
            <button class="btn-cancel" type="button">취소</button>
          </div>
        </div>
      </div>
    `;

    const backdrop = this.shadowRoot.querySelector(".modal-backdrop");

    // 닫기 버튼
    this.shadowRoot
      .querySelector(".btn-cancel")
      .addEventListener("click", () => this.remove());

    // 확인 버튼 클릭 시 모달 제거 + alert
    this.shadowRoot
      .querySelector(".btn-confirm")
      .addEventListener("click", () => {
        // FIXME: buy 모달 이벤트 부분
        alert("구매가 완료되었습니다");
        this.remove();
      });

    // 배경 클릭 시 모달 닫기
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) this.remove();
    });

    // ESC 키 눌러서 닫기
    document.addEventListener("keydown", this.handleKeydown);
  }

  handleKeydown(e) {
    if (e.key === "Escape") {
      this.remove();
    }
  }

  disconnectedCallback() {
    // 모달 제거 시 ESC 이벤트도 제거
    document.removeEventListener("keydown", this.handleKeydown);
  }
}

customElements.define("modal-buy-detail", LectureDetail);
export { LectureDetail };
