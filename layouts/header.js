// function loadScript(src) {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = resolve;
//     script.onerror = reject;
//     document.head.appendChild(script);
//   });
// }

// async function loadLibraries() {
//   try {
//     // 순서대로 로드 (jQuery 의존성 고려)
//     await loadScript("/libs/jquery.easing.1.3.js");
//     await loadScript("/libs/jquery.ui.js");
//     await loadScript("/libs/swiper-bundle.min.js");
//     await loadScript("/libs/fancybox/lib/jquery.mousewheel-3.0.6.pack.js");
//     await loadScript("/libs/fancybox/source/jquery.fancybox.pack.js");
//     await loadScript("/utils/script.js");

//     console.log("모든 라이브러리 로드 완료");
//   } catch (error) {
//     console.error("라이브러리 로드 실패:", error);
//   }
// }

// // 헤더 컴포넌트가 로드되면 라이브러리들을 로드
// document.addEventListener("DOMContentLoaded", loadLibraries);
// // <script type="text/javascript" src="/libs/jquery.easing.1.3.js"></script>
// //     <script type="text/javascript" src="/libs/jquery.ui.js"></script>
// //     <script type="text/javascript" src="/libs/swiper-bundle.min.js"></script>
// //     <script
// //       type="text/javascript"
// //       src="/libs/fancybox/lib/jquery.mousewheel-3.0.6.pack.js"
// //     ></script>
// //     <script
// //       type="text/javascript"
// //       src="/libs/fancybox/source/jquery.fancybox.pack.js?v=2.1.5"
// //     ></script>
// //     <script type="text/javascript" src="/utils/script.js"></script>

class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="format-detection" content="telephone=no" />
        <title>Level-XP</title>
        <meta name="subject" content="Level-XP" />
        <meta name="description" content="Level-XP" />
        <meta name="keywords" content="Level-XP" />
        <meta property="og:url" content="http://.website.ne.kr" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Level-XP" />
        <meta property="og:description" content="Level-XP" />
        <meta property="og:image" content="/assets/images/common/logo.png" />
        <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/pretendard.css" />
        <link rel="stylesheet" type="text/css" href="/css/layout.css" />
        <!-- sub 공통 css  -->
        <link rel="stylesheet" type="text/css" href="/css/doc.css" />
        <link rel="stylesheet" type="text/css" href="/css/board.css" />
        <link rel="stylesheet" type="text/css" href="/css/reset.css" />

        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/assets/images/favicon.ico"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/libs/fancybox/source/jquery.fancybox.css?v=2.1.5"
          media="screen"
        />
      </head>
      <body>
        <div id="wrapper">
          <!-- // header -->
          <div id="header">
            <div class="contain">
              <h1 class="sitelogo">
                <a href="/index.html"
                  ><img src="/assets/images/common/logo.png" alt="Level XP" />Level
                  XP</a
                >
              </h1>
              <div id="gnb" class="gnb">
                <ul>
                  <li>
                    <a href="/pages/fe/typescript.html">Frontend</a>
                    <div class="submenu">
                      <ul>
                        <li><a href="/pages/fe/typescript.html">TypeScript</a></li>
                        <li><a href="/pages/fe/react.html">React</a></li>
                        <li><a href="/pages/fe/next-js.html">Next.js</a></li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a href="/pages/be/python.html">Backend</a>
                    <div class="submenu">
                      <ul>
                        <li><a href="/pages/be/python.html">Python</a></li>
                        <li><a href="/pages/be/java.html">Java</a></li>
                        <li><a href="/pages/be/php.html">PHP</a></li>
                      </ul>
                    </div>
                  </li>
                  <li><a href="/pages/admin/admin.html">관리자 페이지</a></li>
                </ul>
              </div>
              <div class="utility">
                <a
                  href="https://www.notion.so/ohgiraffers/4-Level-XP-280649136c118055a09cecc401c0c543?source=copy_link"
                  class="go-blog"
                  >블로그</a
                >
                <a href="#">기업서비스</a>
                <button class="btn-login">
                  <img src="/assets/images/common/login.png" alt="로그인" />
                </button>
              </div>
            </div>
            <div class="submenu-bg"></div>
          </div>
        </div>
      </body>`;
  }
}

customElements.define("header-component", HeaderComponent);
export { HeaderComponent };
