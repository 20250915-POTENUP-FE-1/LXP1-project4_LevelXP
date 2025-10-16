// import { attachComponent } from "/utils/component.js";

// attachComponent("/components/lecture/lecture.html", "lecture-list");
class LectureBoard extends HTMLElement {
  connectedCallback() {
    const isAdmin = this.getAttribute("isAdmin") === "true";

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
			<head>
				<link rel="stylesheet" href="/css/lecture-board.css" />
				<link rel="stylesheet" href="/css/board.css" />
				<link rel="stylesheet" href="/css/reset.css" />
			</head>
			<body>
				<form method="post">
					<div class="board-search">
						<div class="total-page">전체 : 1 / 10</div>
						<div class="cate">
							<select name="" class="input" title="분류선택">
								<option value="">전체</option>
								<option value="">가격순</option>
								<option value="">이름순</option>
							</select>
						</div>
						${
              isAdmin
                ? `<a href="#" class="btn-pack medium third btn-regist">강의등록</a>`
                : ""
            }
	          <div id="modal-wrap"><app-modal id="confirmModal"></div>
						<div class="search">
							<input
								type="search"
								name="sk"
								id="keyword"
								class="input"
								title="검색어"
							/>
							<button type="submit" class="btn-pack medium primary">
								검색하기
							</button>
						</div>
					</div>
				</form>

				<div id="lecture-list">
					<slot></slot>
				</div>

				<div class="paginate">
					<a class="direction first" href="#"><span>처음페이지</span></a
					><a class="direction prev" href="#"><span>이전페이지</span></a
					><strong>1</strong><a href="#">2</a><a href="#">3</a><a href="#">4</a
					><a href="#">5</a
					><a class="direction next" href="#"><span>다음페이지</span></a
					><a class="direction last" href="#"><span>마지막페이지</span></a>
				</div>
			</body>`;

    this.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-regist")) {
        event.preventDefault();
        showModal();
        const modal = document.getElementById("confirmModal");
        if (modal) {
          modal.open();
        }
      }
    });
  }
}

customElements.define("lecture-board", LectureBoard);

export { LectureBoard };
