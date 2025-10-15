if (/iPhone|iPod|Android|iPad/.test(window.navigator.platform)) {
  $(document)
    .on("focus", "textarea,input,select", function (e) {
      $("#header").css("position", "absolute");
    })
    .on("blur", "textarea,input,select", function (e) {
      $("#header").css("position", "");
    });
}

jQuery(document).ready(function () {
  stageResize();

  //헤더 gnb호버시
  $("#gnb > ul > li").hover(
    function () {
      $(this).children(".submenu").stop(true, true).slideDown(200);

      // 3번째 메뉴(Admin page)는 제외
      if (!$(this).is(":nth-child(3)")) {
        $(".submenu-bg").stop(true, true).fadeIn(200).addClass("active");
      }
    },
    function () {
      $(this).children(".submenu").stop(true, true).slideUp(200);

      if (!$(this).is(":nth-child(3)")) {
        $(".submenu-bg").stop(true, true).fadeOut(200).removeClass("active");
      }
    }
  );

  // 타이틀 변환
  var homeTile = jQuery("title").text();
  var replaceTitle = jQuery(".sub-title h2").text();
  arrTitle = jQuery(".sub-title h2").text();
  if (replaceTitle == "") {
  } else {
    document.title = arrTitle + " | " + homeTile;
  }

  //메인 슬라이드
  new Swiper(".mainSwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // fancybox
  $(".pop_privacy").fancybox({
    padding: 0,
    margin: 10,
    fitToView: false,
    closeClick: false,
    openEffect: "none",
    closeEffect: "none",
    type: "ajax",
    helpers: {
      overlay: {
        locked: false,
      },
    },
  });

  $(".pop_email").fancybox({
    padding: 0,
    margin: 10,
    fitToView: false,
    closeClick: false,
    openEffect: "none",
    closeEffect: "none",
    type: "ajax",
    helpers: {
      overlay: {
        locked: false,
      },
    },
  });

  //텝
  jQuery(".tab-content").hide();
  jQuery("ul.tabs>li:first").addClass("active").show();
  jQuery(".tab-content:first").show();

  jQuery("ul.tabs>li").click(function (e) {
    e.preventDefault();

    jQuery("ul.tabs>li").removeClass("active");
    jQuery(this).addClass("active");
    jQuery(".tab-content").hide();

    var activeTab = jQuery(this).find("a").attr("href");
    jQuery(activeTab).fadeIn();
    return false;
  });

  // input
  $("input[type=tel], input[numberOnly]").on("keyup", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/g, "")
    );
  });
}); //End

$(window).bind("load resize", function () {
  stageResize();
});

function stageResize() {
  (winH = $(window).height()),
    (docH = $(document).height()),
    (headH = $("#header").outerHeight()),
    (footH = $("#footer").outerHeight());

  $("#sub #container").css("min-height", winH - headH - footH);
}
