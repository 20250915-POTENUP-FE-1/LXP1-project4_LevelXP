class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Modal Title";

    this.shadowRoot.innerHTML = `
			<style>
				:host {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;	
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(0, 0, 0, 0.5);
					visibility: hidden;
					opacity: 0;
					transition: opacity 0.3s ease, visibility 0.3s ease;
					z-index: 1000;
				}
				:host([aria-hidden="false"]) {	
					visibility: visible;
					opacity: 1;
				}
				.modal {
					background: #fff;
					padding: 20px;
					border-radius: 8px;
					width: 90%;
					max-width: 500px;
					box-shadow: 0 2px 10px rgba(0,0,0,0.1);
					position: relative;
				}
				.modal-header {
					font-size: 1.25em;
					margin-bottom: 10px;
				}
				.modal-body {
					margin-bottom: 20px;
				}
				.modal-footer {
					text-align: right;
				}
				button {
					padding: 8px 16px;
					margin-left: 10px;
					border: none;
					border-radius: 4px;
					cursor: pointer;
				}
				.btn-confirm {
					background-color: #4CAF50;
					color: white;
				}
				.btn-cancel {
					background-color: #f44336;
					color: white;
				}
			</style>
			<div id="confirmModal">
				<div class="overlay"></div>
				<div
					class="dialog"
					role="dialog"
					aria-modal="true"
					aria-labelledby="confirmTitle"
				>
					<h3 id="confirmTitle">asdf</h3>
					<div id="confirmMessage">
						<slot></slot>
					</div>
					<div class="actions">
						<button class="btn-confirm" type="button">확인</button>
						<button class="btn-cancel" type="button">취소</button>
					</div>
				</div>
			</div>
		`;

    this.shadowRoot
      .querySelector(".btn-cancel")
      .addEventListener("click", () => this.close());
    this.shadowRoot
      .querySelector(".btn-confirm")
      .addEventListener("click", () => this.confirm());
  }

  open() {
    this.setAttribute("aria-hidden", "false");
    this.shadowRoot.querySelector(".btn-cancel").focus();
  }

  close() {
    this.setAttribute("aria-hidden", "true");
  }

  confirm() {
    this.close();
    this.dispatchEvent(
      new CustomEvent("confirm", { bubbles: true, composed: true })
    );
  }
}

customElements.define("modal-component", Modal);
