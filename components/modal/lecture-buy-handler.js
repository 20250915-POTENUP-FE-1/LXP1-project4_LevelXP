import { LectureDetail } from "/components/modal/lecture-buy.js";

export function bindUserModal(card, { title, detail, price, instructor }) {
  if (!card) return;
  card.addEventListener("click", () => {
    const modal = new LectureDetail();
    modal.setAttribute("title", title);
    modal.setAttribute("detail", detail);
    modal.setAttribute("price", price);
    modal.setAttribute("instructor", instructor);
    document.body.appendChild(modal);
  });
}
