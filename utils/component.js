/**
 * HTML 컴포넌트와 연관된 JS 파일을 함께 로드하는 함수
 */
//attachComponent("layout/header.html", "header-placeholder");
async function attachComponent(
  componentPath,
  placeholderId,
  javascriptPath = null
) {
  try {
    // HTML 로드
    const response = await fetch(componentPath); // http://localhost:5501/layout/header.html
    if (!response.ok) {
      throw new Error(`HTTP 오류 : ${response.status}`);
    }

    const html = await response.text();
    const placeholder = document.getElementById(placeholderId);

    if (placeholder) {
      placeholder.innerHTML = html;

      if (javascriptPath) {
        const script = document.createElement("script");
        script.src = javascriptPath;
        script.type = "module";
        document.head.appendChild(script);
      }

      // 컴포넌트 로드 완료 이벤트
      placeholder.dispatchEvent(
        new CustomEvent("componentLoaded", {
          detail: { componentPath, placeholderId },
        })
      );
    } else {
      console.error(`'${placeholderId}' 요소를 찾을 수 없습니다.`);
    }
  } catch (error) {
    console.error(`컴포넌트 로드 오류 ${componentPath} : `, error);
  }
}

export { attachComponent };
