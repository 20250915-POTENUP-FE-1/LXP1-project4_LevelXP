import { bindUserModal } from "/components/modal/lecture-buy-handler.js";
import { bindAdminModal } from "/utils/handler/lectureHandler.js";

class LectureComponent extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "강의 제목";
    const instructor = this.getAttribute("instructor") || "강사 이름";
    const categoryTitle = this.getAttribute("categoryTitle");
    const categorySubTitle = this.getAttribute("categorySubTitle");
    const price = this.getAttribute("price") || "100,000";
    const detail =
      this.getAttribute("detail") || `${instructor} 강의 상세 내용`;
    const recommandedCompany =
      this.getAttribute("recommandedCompany") || undefined;
    const isAdmin = this.getAttribute("isAdmin") === "true";
    const dataIndex = this.getAttribute("data-index") || "";

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/css/lecture.css" />
      <div class="course-card ${isAdmin ? "admin" : ""}">
        <div class="thumb"><img src="/assets/images/sub/lecture-02.png" alt="" /></div>
        <div class="meta">
          ${
            isAdmin
              ? `<div class="btn-pack small cate bg-${
                  categoryTitle === "FE" ? "fe" : "be"
                }">${categoryTitle}-${categorySubTitle}</div>`
              : ""
          }
          <h3 class="course-title">${title}</h3>
          <p class="instructor">${instructor}</p>
          <p class="price">${price}원</p>
          <div class="co-recomm">
            <span>${
              recommandedCompany
                ? `<strong>${recommandedCompany}</strong> 추천 강의!`
                : ""
            }</span>
          </div>
          ${
            isAdmin
              ? `<div class="buttons">
                   <a href="#" class="btn-pack small btn-edit">수정</a>
                   <a href="#" class="btn-pack small btn-delete">삭제</a>
                 </div>`
              : ""
          }
        </div>
      </div>
    `;

    const card = this.shadowRoot.querySelector(".course-card");

    if (!isAdmin) bindUserModal(card, { title, detail, price });
    if (isAdmin)
      bindAdminModal(this.shadowRoot, {
        title,
        instructor,
        price,
        recommandedCompany,
        dataIndex,
      });
  }
}

customElements.define("lecture-item", LectureComponent);
export { LectureComponent };
