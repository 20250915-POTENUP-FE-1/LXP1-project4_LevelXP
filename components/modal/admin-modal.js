// ...existing code...
(function(window, document){
  'use strict';

  class AdminModalComponent {
    constructor() {
      this.TEMPLATE = `
<link rel="stylesheet" href="/css/modal-admin.css">
<div id="lectureFormModal" class="edit-modal" style="display:none;">
  <div class="modal-content">
    <div class="modal-header"><h3>강의 등록</h3><button class="modal-close" data-role="close">&times;</button></div>
    <form id="lectureForm" class="modal-form">
      <input type="hidden" id="edit-lecture-index">
      <div class="cate">
        <select id="edit-lecture-category" class="input" title="분류선택">
          <option value="">분류선택</option>
          <option value="fe-ts">Fe typescript</option>
          <option value="fe-react">Fe react</option>
          <option value="be-java">be java</option>
        </select>
      </div>
      <div class="form-group img-wrap">
        <label for="upfile">첨부파일</label>
        <div class="files-upload-input">
          <input type="file" id="upfile" accept="image/*" class="form-input" />
          <div class="preview-wrap" id="preview-wrap"></div>
          <button type="button" class="btn-pack btn-delete" data-role="remove-file">삭제</button>
        </div>
      </div>
      <div class="form-group">
        <label for="edit-lecture-name">강의명</label>
        <input type="text" id="edit-lecture-name" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="edit-lecture-instructor">강사명</label>
        <input type="text" id="edit-lecture-instructor" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="edit-lecture-price">가격</label>
        <input type="text" id="edit-lecture-price" class="form-input" required>
      </div>
      <div class="form-group">
        <label for="edit-lecture-cop">회사명</label>
        <input type="text" id="edit-lecture-cop" class="form-input">
      </div>
      <div class="modal-actions">
        <button type="button" class="cancel-btn" data-role="close">취소</button>
        <button type="submit" class="save-btn">저장</button>
      </div>
    </form>
  </div>
</div>`.trim();

      this.container = null;
      this.modalEl = null;
      this._bound = false;
    }

    init(options = {}) {
      const selector = options.container || '#modal-wrap';
      const container = document.querySelector(selector) || document.body;
      if (!container) return;
      this.container = container;

      if (!container.querySelector('#lectureFormModal')) {
        const wrap = document.createElement('div');
        wrap.innerHTML = this.TEMPLATE;
        while (wrap.firstChild) container.appendChild(wrap.firstChild);
      }

      this.modalEl = container.querySelector('#lectureFormModal');
      this._refreshRefs();
      this._bind();
    }

    _refreshRefs() {
      if (!this.modalEl) return;
      this.fileInput = this.modalEl.querySelector('#upfile');
      this.previewWrap = this.modalEl.querySelector('#preview-wrap');
      this.formEl = this.modalEl.querySelector('#lectureForm');
      this.headerTitle = this.modalEl.querySelector('.modal-header h3');
    }

    _bind() {
      if (!this.modalEl || this._bound) return;

      // 1 닫기 버튼
      this.modalEl.addEventListener('click', (e) => {
        const role = e.target.getAttribute && e.target.getAttribute('data-role');
        if (role === 'close' || e.target.classList.contains('modal-overlay')) {
          e.preventDefault && e.preventDefault();
          this.hide();
        }
      });

      // 2️. 파일 업로드 change 이벤트
      this.modalEl.addEventListener('change', (e) => { 
        const target = e.target;
        if (!target) return;
        if (target.id === 'upfile' || target.matches && target.matches('input[type="file"]#upfile')) {
          this._refreshRefs();
          if (!this.previewWrap) {
            this.previewWrap = document.createElement('div');
            this.previewWrap.id = 'preview-wrap';
            const parent = target.parentNode || this.modalEl.querySelector('.files-upload-input') || this.modalEl;
            parent.appendChild(this.previewWrap);
          }
          const file = target.files && target.files[0];
          if (this.previewWrap) this.previewWrap.innerHTML = '';
          if (!file) return;
          if (!file.type || file.type.indexOf('image/') !== 0) {
            alert('이미지 파일만 선택 가능합니다.');
            try { target.value = ''; } catch (e) {}
            return;
          }
          if (window.FileReader) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              const img = document.createElement('img');
              img.src = ev.target.result;
              img.alt = '미리보기';
              img.style.maxWidth = '200px';
              img.style.display = 'block';
              if (this.previewWrap) this.previewWrap.appendChild(img);
            };
            reader.readAsDataURL(file);
          } else {
            const objectUrl = URL.createObjectURL(file);
            const img = document.createElement('img');
            img.src = objectUrl;
            img.alt = '미리보기';
            img.style.maxWidth = '200px';
            img.style.display = 'block';
            img.addEventListener('load', () => URL.revokeObjectURL(objectUrl));
            if (this.previewWrap) this.previewWrap.appendChild(img);
          }
        }
      });

      this.modalEl.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('[data-role="remove-file"]');
        if (!removeBtn) return;

        e.preventDefault();
        this._refreshRefs();

        const input = this.modalEl.querySelector('#upfile') || this.fileInput;
        if (input) {
          try { input.value = ''; } catch (err) {}
          try { input.dispatchEvent(new Event('change', { bubbles: true })); } catch (err) {}
        }

        let preview = this.modalEl.querySelector('#preview-wrap') || this.previewWrap;
        if (preview) {
          const imgs = Array.from(preview.querySelectorAll('img'));
          imgs.forEach(img => {
            try {
              if (img.src && img.src.startsWith('blob:')) URL.revokeObjectURL(img.src);
            } catch (err) {}
            img.remove();
          });
          preview.innerHTML = '';
        }

        if (input && input.parentNode) {
          try {
            const fresh = input.cloneNode(true);
            input.parentNode.replaceChild(fresh, input);
            this._refreshRefs();
          } catch (err) {}
        }
      });

      // 4. form 제출
      if (this.formEl) {
        const newForm = this.formEl.cloneNode(true);
        this.formEl.parentNode.replaceChild(newForm, this.formEl);
        this.formEl = newForm;
        this.formEl.addEventListener('submit', (e) => {
          e.preventDefault();
          const ev = new CustomEvent('adminModal:submit', { detail: this.getFormData() });//
          let index = this.modalEl.querySelector('#edit-lecture-index').value
          // 변수에 저장되어있는 데이터를 함수에 사용
          
          
          document.dispatchEvent(ev);
          this.hide();
        });
      }

      this._bound = true;
    }

    show() {
      if (!this.modalEl) return;
      this.modalEl.style.display = 'block';
    }

    hide() {
      if (!this.modalEl) return;
      this.modalEl.style.display = 'none';
    }

    setHeader(text) {
      this._refreshRefs();
      if (this.headerTitle) this.headerTitle.textContent = text || '';
    }

    setFormData(data = {}) {
      this._refreshRefs();
      if (!this.modalEl) return;
      try {
        if (data.index !== undefined) this.modalEl.querySelector('#edit-lecture-index').value = data.index;
        if (data.category !== undefined) this.modalEl.querySelector('#edit-lecture-category').value = data.category;
        if (data.name !== undefined) this.modalEl.querySelector('#edit-lecture-name').value = data.name;
        if (data.instructor !== undefined) this.modalEl.querySelector('#edit-lecture-instructor').value = data.instructor;
        if (data.price !== undefined) this.modalEl.querySelector('#edit-lecture-price').value = data.price;
        if (data.cop !== undefined) this.modalEl.querySelector('#edit-lecture-cop').value = data.cop;
        if (this.previewWrap) {
          this.previewWrap.innerHTML = '';
          if (data.imgSrc) {
            const img = document.createElement('img');
            img.src = data.imgSrc;
            img.style.maxWidth = '200px';
            this.previewWrap.appendChild(img);
          }
        }
      } catch (e) { /* ignore */ }
    }

    getFormData() {
      if (!this.modalEl) return null;
      return {
        index: this.modalEl.querySelector('#edit-lecture-index').value || '',
        category: this.modalEl.querySelector('#edit-lecture-category').value || '',
        name: this.modalEl.querySelector('#edit-lecture-name').value || '',
        instructor: this.modalEl.querySelector('#edit-lecture-instructor').value || '',
        price: this.modalEl.querySelector('#edit-lecture-price').value || '',
        cop: this.modalEl.querySelector('#edit-lecture-cop').value || '',
        file: (this.fileInput && this.fileInput.files && this.fileInput.files[0]) || null
      };
    }
  }

  if (!window.AdminModal) {
    window.AdminModal = new AdminModalComponent();
  }

})(window, document);