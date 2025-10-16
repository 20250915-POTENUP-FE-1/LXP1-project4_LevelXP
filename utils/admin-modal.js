// ...existing code...
(function(window, document){
  const TEMPLATE = `
  <link rel="stylesheet" href="/css/modal-admin.css">

  <div id="editModal" class="edit-modal" style="display:none;">
    <div class="modal-content">
      <div class="modal-header">
        <h3>강의 등록</h3>
        <button type="button" class="modal-close" data-role="close">&times;</button>
      </div>
      <form id="lecture" class="modal-form">
        <input type="hidden" id="edit-lecture-index">
        <div class="cate">
          <select name="" class="input" title="분류선택">
            <option value="">분류선택</option>
            <option value="">Fe typescript</option>
            <option value="">Fe next-js</option>
            <option value="">Fe react</option>
            <option value="">be java</option>
            <option value="">be php</option>
            <option value="">be python</option>
          </select>
        </div>
        <div class="form-group img-wrap">
          <label for="upfile">첨부파일</label>
          <div id="files-upload" class="files-upload">
            <div class="files-upload-group">
              <div class="files-upload-input">
                <input type="file" name="upfiles[]" class="input form-input" id="upfile" title="첨부파일" accept="image/*">
                <div class="preview-wrap" id="preview-wrap"></div>
                <div class="files-upload-btns">
                  <button type="button"  class="btn-pack btn-delete" data-role="remove-file">삭제</button>
                </div>
              </div>
            </div>
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
          <input type="text" id="edit-lecture-cop" class="form-input" required>
        </div>

        <div class="modal-actions">
          <button type="button" class="cancel-btn" data-role="close">취소</button>
          <button type="submit" class="save-btn">저장</button>
        </div>
      </form>
    </div>
  </div>
  `;

  function createElementFromHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    return div;
  }

  function isImageFile(file) {
    return file && file.type && file.type.indexOf('image/') === 0;
  }

  let containerEl = null;
  let modalEl = null;
  let fileInput = null;
  let previewWrap = null;

  const AdminModal = {
    init: function(options = {}) {
      const selector = options.container || '#modal-wrap';
      const container = document.querySelector(selector) || document.body;
      if (!container) return;

      // prevent double init
      if (container.querySelector('#editModal')) {
        containerEl = container;
        modalEl = container.querySelector('#editModal');
        fileInput = modalEl.querySelector('#upfile');
        previewWrap = modalEl.querySelector('#preview-wrap');
        this._bind();
        return;
      }

      const fragment = createElementFromHTML(TEMPLATE);
      // append children of fragment into container
      while (fragment.firstChild) container.appendChild(fragment.firstChild);
      containerEl = container;
      modalEl = container.querySelector('#editModal');
      fileInput = modalEl.querySelector('#upfile');
      previewWrap = modalEl.querySelector('#preview-wrap');

      this._bind();
    },

    _bind: function() {
      if (!modalEl) return;
      if (modalEl.dataset.bound === '1') return;

      // 닫기 버튼 처리: 클릭 기본 동작 막고 모달 숨김
      modalEl.addEventListener('click', function(e){
        const role = e.target.getAttribute && e.target.getAttribute('data-role');
        if (role === 'close') {
          // 버튼이 form 내부에 있을 경우 submit이 발생하는 것을 명시적으로 막음
          if (e.preventDefault) e.preventDefault();
          AdminModal.hide();
          return;
        }
      });

      // 파일 input은 기존 참조 유지(중복 바인딩 주의)
      var currentInput = modalEl.querySelector('#upfile');
      if (currentInput) {
        var newInput = currentInput.cloneNode(true);
        currentInput.parentNode.replaceChild(newInput, currentInput);
        fileInput = newInput;
        previewWrap = modalEl.querySelector('#preview-wrap');

        fileInput.addEventListener('change', function(e){
          const file = e.target.files && e.target.files[0];
          if (previewWrap) previewWrap.innerHTML = '';
          if (!file) return;
          if (!isImageFile(file)) {
            alert('이미지 파일만 선택 가능합니다.');
            fileInput.value = '';
            return;
          }

          const objectUrl = URL.createObjectURL(file);
          const img = document.createElement('img');
          img.src = objectUrl;
          img.alt = '미리보기 이미지';
          img.style.maxWidth = '200px';
          img.style.marginTop = '10px';
          img.style.display = 'block';
          img.style.border = '1px solid #ddd';
          img.style.borderRadius = '8px';

          img.addEventListener('load', function() {
            URL.revokeObjectURL(objectUrl);
          });

          previewWrap.appendChild(img);
        });
      }

      // remove file 버튼
      var removeBtn = modalEl.querySelector('[data-role="remove-file"]');
      if (removeBtn) {
        var newRemove = removeBtn.cloneNode(true);
        removeBtn.parentNode.replaceChild(newRemove, removeBtn);
        newRemove.addEventListener('click', function(e){
          if (e.preventDefault) e.preventDefault();
          AdminModal.removeFile();
        });
      }

      // form submit: replace node to avoid duplicate handlers
      var form = modalEl.querySelector('#lecture');
      if (form) {
        var newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        newForm.addEventListener('submit', function(e){
          e.preventDefault();
          const event = new CustomEvent('adminModal:submit', { detail: AdminModal.getFormData() });
          document.dispatchEvent(event);
          AdminModal.hide();
        });
      }

      modalEl.dataset.bound = '1';
    },


    show: function() {
      if (!modalEl) return;
      modalEl.style.display = 'block';
    },

    hide: function() {
      if (!modalEl) return;
      modalEl.style.display = 'none';
    },

    removeFile: function() {
      if (!fileInput || !previewWrap) return;
      fileInput.value = '';
      previewWrap.innerHTML = '';
    },

    getFormData: function() {
      if (!modalEl) return null;
      const data = {
        index: modalEl.querySelector('#edit-lecture-index').value || '',
        category: modalEl.querySelector('.cate select').value || '',
        name: modalEl.querySelector('#edit-lecture-name').value || '',
        instructor: modalEl.querySelector('#edit-lecture-instructor').value || '',
        price: modalEl.querySelector('#edit-lecture-price').value || '',
        cop: modalEl.querySelector('#edit-lecture-cop').value || '',
        file: (fileInput && fileInput.files && fileInput.files[0]) || null
      };
      return data;
    }
  };

  // expose globally for easy use
  window.AdminModal = AdminModal;
  window.removeFile = function(){ AdminModal.removeFile(); };

})(window, document);
