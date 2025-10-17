class ModalOpener {
  constructor(opts = {}) {
    this.container = opts.container || "#modal-wrap";
    this.maxRetries = opts.maxRetries || 30;
    this.delay = opts.delay || 100;
  }

  waitForAdminModal(retry = 0) {
    return new Promise((resolve, reject) => {
      if (window.AdminModal) {
        try {
          window.AdminModal.init({ container: this.container });
        } catch (e) {}
        return resolve(window.AdminModal);
      }
      if (retry >= this.maxRetries)
        return reject(new Error("AdminModal not found"));
      setTimeout(
        () =>
          this.waitForAdminModal(retry + 1)
            .then(resolve)
            .catch(reject),
        this.delay
      );
    });
  }

  // 강의 버튼 클릭시 모달 오픈 - 초기화 수정 부분
  open(detail = {}) {
    return this.waitForAdminModal()
      .then(() => {
        try {
          // 항상 모달 초기화 먼저
          window.AdminModal.setFormData({
            // 폼값 초기화 추가
            index: "",
            category: "",
            title: "",
            instructor: "",
            price: "",
            recommandedCompany: "",
            imgSrc: "",
          });

          // 그 다음 전달된 데이터 채우기 (수정 시에만 값 있음)
          window.AdminModal.setHeader(detail.title || "");
          window.AdminModal.setFormData(detail.data || {});
          window.AdminModal.show();
        } catch (e) {
          // fallback: show DOM directly
          const el = document.querySelector("#lectureFormModal");
          if (el) el.style.display = "block";
        }
      })
      .catch((err) => console.warn("Modal open failed:", err));
  }

  install() {
    // listen composed event from shadow DOM
    document.addEventListener(
      "openCommonModal",
      (ev) => this.open(ev.detail || {}),
      false
    );

    // fallback: direct clicks on light DOM buttons
    document.addEventListener(
      "click",
      (e) => {
        const r = e.target.closest && e.target.closest(".btn-regist");
        if (r) {
          e.preventDefault();
          this.open({ title: "강의등록", data: {} });
          return;
        }

        const edit =
          e.target.closest &&
          e.target.closest(".btn-pack.small.edit, .btn-edit");
        if (edit) {
          e.preventDefault();

          // try to find enclosing lecture-item (handles shadow DOM composedPath and light DOM)
          let lectureEl = null;
          if (typeof e.composedPath === "function") {
            const path = e.composedPath();
            for (let i = 0; i < path.length; i++) {
              const node = path[i];
              if (!node || node.nodeType !== 1) continue;
              const tag = node.tagName && node.tagName.toLowerCase();
              if (
                tag === "lecture-item" ||
                (node.classList && node.classList.contains("lecture-item"))
              ) {
                lectureEl = node;
                break;
              }
            }
          }
          if (!lectureEl)
            lectureEl =
              edit.closest &&
              (edit.closest("lecture-item") || edit.closest(".lecture-item"));

          // try to find associated course-card (light DOM) for DOM extraction fallback
          const card =
            (lectureEl &&
              ((lectureEl.shadowRoot &&
                lectureEl.shadowRoot.querySelector &&
                lectureEl.shadowRoot.querySelector(".course-card")) ||
                (lectureEl.querySelector &&
                  lectureEl.querySelector(".course-card")))) ||
            (edit.closest && edit.closest(".course-card"));

          let idx =
            card &&
            (card.getAttribute("data-index") ||
              (card.dataset && card.dataset.index));
          let data = { index: idx || "" };

          // load from localStorage if possible
          try {
            const raw = localStorage.getItem("lectures");
            if (raw) {
              const arr = JSON.parse(raw);
              if (Array.isArray(arr) && idx !== undefined && arr[idx]) {
                data = Object.assign({}, arr[idx], { index: idx });
              }
            }
          } catch (e) {}

          // fallback: extract from DOM/card
          try {
            if (!data.name && card && card.querySelector) {
              const titleEl = card.querySelector(".course-title");
              if (titleEl) data.name = titleEl.textContent.trim();
            }
            if (!data.instructor && card && card.querySelector) {
              const instEl = card.querySelector(".instructor");
              if (instEl) data.instructor = instEl.textContent.trim();
            }
            if (
              (!data.price || data.price === "") &&
              card &&
              card.querySelector
            ) {
              const priceEl = card.querySelector(".price");
              if (priceEl)
                data.price = (priceEl.textContent || "").replace(/[^0-9]/g, "");
            }
            if (
              (!data.imgSrc || data.imgSrc === "") &&
              card &&
              card.querySelector
            ) {
              const imgEl = card.querySelector("img");
              if (imgEl) data.imgSrc = imgEl.src;
            }
          } catch (err) {
            /* ignore */
          }

          // if lecture-item provides recommandedCompany attribute, prefer it for cop
          try {
            if (lectureEl) {
              const rc =
                lectureEl.getAttribute &&
                (lectureEl.getAttribute("recommandedCompany") ||
                  lectureEl.getAttribute("recommandedcompany"));
              if (rc) {
                data.cop = rc;
              } else if (!data.cop) {
                // also check dataset
                const ds =
                  lectureEl.dataset &&
                  (lectureEl.dataset.recommandedcompany ||
                    lectureEl.dataset.recommandedCompany);
                if (ds) data.cop = ds;
              }
            }
          } catch (e) {
            /* ignore */
          }

          // ensure at least empty strings for expected fields
          data = Object.assign(
            {
              index: "",
              category: "",
              name: "",
              instructor: "",
              price: "",
              cop: "",
              imgSrc: "",
            },
            data
          );

          this.open({ title: "강의 수정", data: data });
        }
      },
      false
    );
  }
}

const modalOpener = new ModalOpener();
window.ModalOpener = modalOpener;
modalOpener.install();
export default modalOpener;
