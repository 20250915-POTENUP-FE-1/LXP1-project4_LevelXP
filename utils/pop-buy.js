$(function () {
  $("#header-wrap").load("/layouts/header.html");
  $("#footer-wrap").load("/layouts/footer.html");

  $(function () {
    $("#lecture-wrap").load("/components/lecture/lecture.html", function () {
      // 기존 동일 이벤트 제거(중복 바인딩 방지)
      $("#lecture-wrap").off("click.buyModal");

      // 오직 .lecture-list 내부의 각 리스트 항목 링크만 처리
      $("#lecture-wrap").on(
        "click.buyModal",
        ".lecture-list ul li > a",
        function (e) {
          e.preventDefault();

          var $link = $(this);

          // 안전장치: 혹시 페이징 내부의 링크가 섞여있다면 무시
          if ($link.closest(".paginate").length) return;

          // 강의명 추출
          var title = $link.attr("data-title") || $link.data("title") || "";
          if (!title)
            title = $link.find(".tit, .lecture-title").first().text().trim();
          if (!title)
            title =
              $link.attr("title") ||
              $link.text().trim().slice(0, 80) ||
              "선택한 강의";

          // 모달 메시지 표시
          $("#confirmMessage").text("“" + title + "” 강의를 구매하시겠습니까?");
          $("#confirmModal").fadeIn(150).attr("aria-hidden", "false");
          $(".btn-confirm").focus();
        }
      );

      // 모달 동작 바인딩 (중복 바인딩 방지 위해 document에 namespace 사용)
      $(document).off(".buyModalHandlers");

      // 닫기
      $(document).on(
        "click.buyModalHandlers",
        "#confirmModal .btn-cancel, #confirmModal .overlay",
        function () {
          $("#confirmModal").fadeOut(120).attr("aria-hidden", "true");
        }
      );

      // 확인
      $(document).on(
        "click.buyModalHandlers",
        "#confirmModal .btn-confirm",
        function () {
          $("#confirmModal").fadeOut(120).attr("aria-hidden", "true");
          alert("구매가 완료되었습니다.");
        }
      );

      // ESC로 닫기
      $(document).on("keydown.buyModalHandlers", function (e) {
        if (e.key === "Escape" && $("#confirmModal").is(":visible")) {
          $("#confirmModal").fadeOut(120).attr("aria-hidden", "true");
        }
      });
    });
  });
});
