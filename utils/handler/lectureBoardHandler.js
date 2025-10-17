import { getLectureList } from "../localStorage.js";
import { getLectureElementList } from "../lecture.js";

export class LectureBoardHandler {
  constructor(lectureBoardElement, isAdmin = false) {
    this.element = lectureBoardElement;
    this.isAdmin = isAdmin;

    this.searchLecture();
    this.showAllLectureList();
    this.showLectureBoardModal();
  }

  searchLecture() {
    const searchInput = this.element.shadowRoot.querySelector("#keyword");
    const searchButton =
      this.element.shadowRoot.querySelector(".search button");

    searchInput.addEventListener("keydown", (event) => {
      const keyword = event.target.value || "";

      if (event.key === "Enter") {
        event.preventDefault();

        const searchEvent = new CustomEvent("executeSearch", {
          detail: { keyword },
          bubbles: true,
          composed: true,
        });
        this.element.dispatchEvent(searchEvent);

        this.showKeywordLectureList(keyword);
      }

      if (event.key === "Escape") {
        event.target.value = "";

        const clearEvent = new CustomEvent("clearSearch", {
          bubbles: true,
          composed: true,
        });

        this.element.dispatchEvent(clearEvent);
      }
    });

    searchButton.addEventListener("click", (event) => {
      event.preventDefault();
      const keyword = searchInput.value || "";

      const searchEvent = new CustomEvent("executeSearch", {
        detail: { keyword },
        bubbles: true,
        composed: true,
      });
      this.element.dispatchEvent(searchEvent);

      this.showKeywordLectureList(keyword);
    });
  }

  showAllLectureList() {
    const lectureListContainer =
      this.element.shadowRoot.querySelector("#lecture-list ul");
    const lectureElementList = getLectureElementList(
      getLectureList(),
      this.isAdmin
    ).join("");

    lectureListContainer.innerHTML = lectureElementList;
  }

  showKeywordLectureList(keyword) {
    const lectureListContainer =
      this.element.shadowRoot.querySelector("#lecture-list ul");

    const filteredLectures = window.searchLectures(keyword);

    const lectureElementList = getLectureElementList(
      filteredLectures,
      this.isAdmin
    ).join("");

    lectureListContainer.innerHTML = lectureElementList;
  }

  showLectureBoardModal() {
    this.element.shadowRoot.addEventListener("click", (event) => {
      // 강의등록 버튼: 단순 open 요청
      const registBtn =
        event.target.closest && event.target.closest(".btn-regist");
      if (registBtn) {
        event.preventDefault();
        this.element.dispatchEvent(
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
          if (titleEl) data.title = titleEl.textContent.trim();
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
