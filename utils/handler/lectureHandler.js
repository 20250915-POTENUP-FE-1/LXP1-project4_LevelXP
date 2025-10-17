import { LectureBoardHandler } from "./lectureBoardHandler.js";

export function bindAdminModal(
  shadowRoot,
  { title, instructor, price, recommandedCompany, dataIndex }
) {
  if (!shadowRoot) return;

  const editBtn = shadowRoot.querySelector(".btn-edit");
  if (editBtn) {
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const event = new CustomEvent("openCommonModal", {
        bubbles: true,
        composed: true,
        detail: {
          title: "강의 수정",
          data: {
            title: title,
            instructor,
            price: price.replace(/[^0-9]/g, ""),
            recommandedCompany: recommandedCompany || "",
            index: dataIndex,
          },
        },
      });
      shadowRoot.host.dispatchEvent(event);
    });
  }

  const deleteBtn = shadowRoot.querySelector(".btn-delete");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (confirm("정말 삭제하시겠습니까?")) {
        const lectureBoard = document.querySelector("lecture-board");

        console.log(lectureBoard);

        window.deleteLecture(dataIndex);

        if (lectureBoard) {
          const isAdmin = lectureBoard.getAttribute("isAdmin") === "true";
          const lectureBoardHandler = new LectureBoardHandler(
            lectureBoard,
            isAdmin
          );

          lectureBoardHandler.showAllLectureList();
        }
      }
    });
  }
}
