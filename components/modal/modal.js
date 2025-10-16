class Modal extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "확인";
    const body = this.innerHTML || "";

    this.shadowRoot.innerHTML = `
			<div >
				<div class="overlay"></div>
				<div
					class="dialog"
					role="dialog"
					aria-modal="true"
					aria-labelledby="confirmTitle"
				>
					<h3 id="confirmTitle">${title}</h3>
					<div id="">
						<slot></slot>
					</div>
					<div class="actions">
						<button class="btn-confirm" type="button">확인</button>
						<button class="btn-cancel" type="button">취소</button>
					</div>
				</div>
			</div>
		`;
  }
}

customElements.define("modal-component", Modal);
export { Modal };
