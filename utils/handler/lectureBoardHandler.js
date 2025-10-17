import { getLectureList } from "../localStorage.js";
import { getLectureElementList } from "../lecture.js";

export class LectureBoardHandler {
  constructor(lectureBoardElement, isAdmin) {
    this.element = lectureBoardElement;
    this.isAdmin = isAdmin || false;

    this.searchLecture();
    this.showAllLectureList();
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
    );

    lectureListContainer.innerHTML = lectureElementList.join("");
  }

  showKeywordLectureList(keyword) {
    const lectureListContainer =
      this.element.shadowRoot.querySelector("#lecture-list ul");

    const filteredLectures = window.searchLectures(keyword);

    const lectureElementList = getLectureElementList(
      filteredLectures,
      this.isAdmin
    );

    lectureListContainer.innerHTML = lectureElementList.join("");
  }
}
