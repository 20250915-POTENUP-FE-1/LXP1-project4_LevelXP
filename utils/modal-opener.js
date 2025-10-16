// ...new file...
class ModalOpener {
  constructor(opts = {}) {
    this.container = opts.container || '#modal-wrap';
    this.maxRetries = (opts.maxRetries || 30);
    this.delay = (opts.delay || 100);
  }

  waitForAdminModal(retry = 0) {
    return new Promise((resolve, reject) => {
      if (window.AdminModal) {
        try { window.AdminModal.init({ container: this.container }); } catch(e){}
        return resolve(window.AdminModal);
      }
      if (retry >= this.maxRetries) return reject(new Error('AdminModal not found'));
      setTimeout(() => this.waitForAdminModal(retry + 1).then(resolve).catch(reject), this.delay);
    });
  }

  open(detail = {}) {
    return this.waitForAdminModal().then(() => {
      try {
        window.AdminModal.setHeader(detail.title || '');
        window.AdminModal.setFormData(detail.data || {});
        window.AdminModal.show();
      } catch (e) {
        // fallback: show DOM directly
        const el = document.querySelector('#lectureFormModal');
        if (el) el.style.display = 'block';
      }
    }).catch(err => console.warn('Modal open failed:', err));
  }

  install() {
    // listen composed event from shadow DOM
    document.addEventListener('openCommonModal', (ev) => this.open(ev.detail || {}), false);

    // fallback: direct clicks on light DOM buttons
    document.addEventListener('click', (e) => {
      const r = e.target.closest && e.target.closest('.btn-regist');
      if (r) { e.preventDefault(); this.open({ title: '강의등록', data: {} }); return; }
      const edit = e.target.closest && e.target.closest('.btn-pack.small.edit, .btn-edit');
      if (edit) {
        e.preventDefault();
        const card = edit.closest && edit.closest('.course-card');
        let idx = card && (card.getAttribute('data-index') || card.dataset.index);
        let data = { index: idx || '' };
        try {
          const raw = localStorage.getItem('lectures');
          if (raw) {
            const arr = JSON.parse(raw);
            if (Array.isArray(arr) && idx !== undefined && arr[idx]) data = Object.assign({}, arr[idx], { index: idx });
          }
        } catch(e){}
        // fallback DOM extraction
        if (!data.name && card) {
          data.name = (card.querySelector('.course-title') && card.querySelector('.course-title').textContent.trim()) || '';
          data.instructor = (card.querySelector('.instructor') && card.querySelector('.instructor').textContent.trim()) || '';
          data.price = (card.querySelector('.price') && card.querySelector('.price').textContent.replace(/[^0-9]/g,'')) || '';
          const img = card.querySelector && card.querySelector('img');
          if (img) data.imgSrc = img.src;
        }
        this.open({ title: '강의 수정', data: data });
      }
    }, false);
  }
}

const modalOpener = new ModalOpener();
window.ModalOpener = modalOpener;
modalOpener.install();
export default modalOpener;
// ...new file...