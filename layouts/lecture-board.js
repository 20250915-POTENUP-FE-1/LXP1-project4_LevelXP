import { getLectureElementList } from "../utils/lecture.js";
import { getLectureList, initializeLectureData } from "/utils/localStorage.js";
import { LectureBoardHandler } from "/utils/handler/lectureBoardHandler.js";
import { APP_CATEGORY } from "/constants/category.js";

// lecture-board.js — connectedCallback 교체 (shadow 내부 클릭을 받아 composed event로 라이트로 전달, 수정 버튼은 composedPath로 소속 카드 찾음)
class LectureBoard extends HTMLElement {
  connectedCallback() {
    const params = new URLSearchParams(window.location.search);

    const category = params.get("category");
    const categoryDetail = params.get("categoryDetail");

    const isAdmin = category === "ADMIN";

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/lecture.css" />
      <link rel="stylesheet" href="/css/lecture-board.css" />
      <link rel="stylesheet" href="/css/board.css" />
      <link rel="stylesheet" href="/css/reset.css" />
      <div class="board-search">
        <div class="total-page"></div>
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
          <ul></ul>
				</div>

			</body>
    `;
    // FIXME: pagenation
    // 		<div class="paginate">
    // 	<a class="direction first" href="#"><span>처음페이지</span></a
    // 	><a class="direction prev" href="#"><span>이전페이지</span></a
    // 	><strong>1</strong><a href="#">2</a><a href="#">3</a><a href="#">4</a
    // 	><a href="#">5</a
    // 	><a class="direction next" href="#"><span>다음페이지</span></a
    // 	><a class="direction last" href="#"><span>마지막페이지</span></a>
    // </div>

    this.handler = new LectureBoardHandler(
      this,
      isAdmin,
      category,
      categoryDetail
    );
  }
}

customElements.define("lecture-board", LectureBoard);

export { LectureBoard };
// ...existing code...
