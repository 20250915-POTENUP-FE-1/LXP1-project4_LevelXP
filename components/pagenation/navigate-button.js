class PagenationNavigateButton extends HTMLElement {
  connectedCallback() {
    // prev:이전
    // next:다음
    const direction = this.getAttribute("direction");

    // page:페이지(1,2,3,4,5...)
    // step:다음/이전
    const styleType = this.getAttribute("styleType");

    // 현재 페이지인지 여부
    const isCurrentPageIndex = this.getAttribute("isCurrent");
    // 현재 페이지 인덱스 (QueryParams 등에서 받아올 예정)
    const currentPageIndex = this.getAttribute("currentPageIndex");
    const index = this.getAttribute("index");

    const disabled = this.getAttribute("disabled");
    const isForceStep = this.getAttribute("isForceStep");

    // 스타일 분기
    switch (styleType) {
      case "page":
        this.innerHTML = `
          ${
            isCurrentPageIndex
              ? `<strong>${index}</strong>`
              : `<a href="#">${index}</a>`
          }
        `;
        break;

      case "step":
        const directionText = direction === "next" ? "다음" : "이전";
        const stepType = direction === "next" ? "next" : "prev";
        const forceStepType = direction === "next" ? "last" : "first";

        this.innerHTML = `
          <a class="direction ${
            isForceStep ? forceStepType : stepType
          }" href="#"><span>${directionText}페이지</span></a>
        `;
        break;
    }

    // this.innerHTML = `
    //   <a class="direction first" href="#"><span>처음페이지</span></a>
    // `;

    // if (styleType === "page") {
    //   this.innerHTML = `
    // 		${isCurrentPageIndex ? `<strong>1</strong>` : `<a href="#">2</a>`}
    // 	`;
    //   return;
    // } else if (styleType === "direction") {
    //   this.innerHTML = `
    // 	${
    //     direction === "next"
    //       ? // 다음 버튼
    //         '<a class="direction next" href="#"><span>다음페이지</span></a>'
    //       : // 이전 버튼
    //         `<a class="direction
    // 				${isForceStep ? `first` : `prev`}
    // 				" href="#"><span>
    // 				${isForceStep ? `처음` : `이전`}페이지
    // 				</span></a>`
    //   }`;
    //   return;
    // }
    // // <a class="direction first" href="#"><span>처음페이지</span></a>

    // this.innerHTML = `
    // 	<a class="direction ${direction} ${disabled ? "disabled" : ""}" href="#">
    // 		<span>${direction === "next" ? "다음페이지" : "이전페이지"}</span>
    // 	</a>
    // `;
  }
}

customElements.define("pagenation-navigate-button", PagenationNavigateButton);

export { PagenationNavigateButton };
