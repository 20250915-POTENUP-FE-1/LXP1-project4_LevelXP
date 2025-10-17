import { getLectureElementList } from "../utils/lecture.js";
import { getLectureList, initializeLectureData } from "/utils/localStorage.js";

// lecture-board.js — connectedCallback 교체 (shadow 내부 클릭을 받아 composed event로 라이트로 전달, 수정 버튼은 composedPath로 소속 카드 찾음)
class LectureBoard extends HTMLElement {
  connectedCallback() {
    const isAdmin = this.getAttribute("isAdmin") === "true";

    initializeLectureData();
    const lectureList = getLectureElementList(getLectureList(), isAdmin).join(
      ""
    );

    // lecture-board에 lecture 컴포넌트 등록
    document.getElementById("lecture-list").innerHTML = lectureList;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/lecture.css" />
      
      <link rel="stylesheet" href="/css/lecture-board.css" />
      <link rel="stylesheet" href="/css/board.css" />
      <link rel="stylesheet" href="/css/reset.css" />
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
					<div class="search">
						<input type="search" id="keyword" class="input" title="검색어" />
						<button type="submit" class="btn-pack medium dark">검색하기</button>
					</div>
      	</div>

				<div id="lecture-list">
					<ul>
						${lectureList}
					</ul>
				</div>
				<div class="paginate">
					<a class="direction first" href="#"><span>처음페이지</span></a
					><a class="direction prev" href="#"><span>이전페이지</span></a
					><strong>1</strong><a href="#">2</a><a href="#">3</a><a href="#">4</a
					><a href="#">5</a
					><a class="direction next" href="#"><span>다음페이지</span></a
					><a class="direction last" href="#"><span>마지막페이지</span></a>
				</div>
			</body>
    `;

    // shadow 내부 클릭을 외부(라이트 DOM)로 전달하기 위해 composed custom event 발행
    this.shadowRoot.addEventListener("click", (event) => {
      // 강의등록 버튼: 단순 open 요청
      const registBtn =
        event.target.closest && event.target.closest(".btn-regist");
      if (registBtn) {
        event.preventDefault();
        this.dispatchEvent(
          new CustomEvent("openCommonModal", {
            detail: { title: "강의등록", data: {} },
            bubbles: true,
            composed: true,
          })
        );
        return;
      }

      // 수정 버튼: 소속 course-card 를 composedPath()에서 찾아 index/정보 추출 후 요청
      const editBtn =
        event.target.closest &&
        event.target.closest(
          ".btn-pack.small.edit, .btn-edit, a.btn-pack.small.edit"
        );
      if (editBtn) {
        event.preventDefault();
        // composedPath로 light DOM 상의 .course-card 찾기
        const path = event.composedPath ? event.composedPath() : [];
        let card = null;
        for (let i = 0; i < path.length; i++) {
          const node = path[i];
          if (
            node &&
            node.nodeType === 1 &&
            node.classList &&
            node.classList.contains("course-card")
          ) {
            card = node;
            break;
          }
        }

        // 기본 데이터
        let data = {
          index: "",
          category: "",
          name: "",
          instructor: "",
          price: "",
          cop: "",
          imgSrc: "",
        };
        if (card) {
          // data-index 우선
          if (card.dataset && card.dataset.index)
            data.index = card.dataset.index;
          // DOM에서 정보 추출(필요시 localStorage로 대체하는 로직은 admin-opener/admin script에서 처리)
          const titleEl = card.querySelector(".course-title");
          const instEl = card.querySelector(".instructor");
          const priceEl = card.querySelector(".price");
          const imgEl = card.querySelector("img");
          if (titleEl) data.name = titleEl.textContent.trim();
          if (instEl) data.instructor = instEl.textContent.trim();
          if (priceEl)
            data.price = (priceEl.textContent || "").replace(/[^0-9]/g, "");
          if (imgEl) data.imgSrc = imgEl.src;
        }

        this.dispatchEvent(
          new CustomEvent("openCommonModal", {
            detail: { title: "강의 수정", data: data },
            bubbles: true,
            composed: true,
          })
        );
        return;
      }
    });
  }
}

customElements.define("lecture-board", LectureBoard);

export { LectureBoard };
// ...existing code...
