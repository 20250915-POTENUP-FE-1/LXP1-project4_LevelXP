if(/iPhone|iPod|Android|iPad/.test(window.navigator.platform)){
	$(document)
	.on('focus', 'textarea,input,select', function(e) {
		$('#header').css('position', 'absolute');
	})
	.on('blur', 'textarea,input,select', function(e) {
		$('#header').css('position', '');
	});
}

jQuery(document).ready(function(){
	stageResize();

	//헤더 gnb호버시
	$('#gnb > ul > li').hover(
		function() {
			$(this).children('.submenu').stop(true,true).slideDown(200);

			// 3번째 메뉴(Admin page)는 제외
			if (!$(this).is(':nth-child(3)')) {
				$('.submenu-bg').stop(true,true).fadeIn(200).addClass('active');
			}
		},
		function() {
			$(this).children('.submenu').stop(true,true).slideUp(200);

			if (!$(this).is(':nth-child(3)')) {
				$('.submenu-bg').stop(true,true).fadeOut(200).removeClass('active');
			}
		}
	);

	// 타이틀 변환
	 var homeTile = jQuery('title').text();
	 var replaceTitle = jQuery('.sub-title h2').text();
	 arrTitle = jQuery('.sub-title h2').text();
	 if(replaceTitle==''){
	 }else{
	  document.title=arrTitle + " | " + homeTile;
	 };

	// 마우스오버시 이미지 변환
	jQuery("img.rollover").mouseover(function(){
		jQuery(this).attr("src",jQuery(this).attr("src").replace(/^(.+)(\.[a-z]+)$/, "$1_on$2"));
	}).mouseout(function(){
		jQuery(this).attr("src",jQuery(this).attr("src").replace(/^(.+)_on(\.[a-z]+)$/, "$1$2"));
	});

	//메인 슬라이드
	var mainSwiper = new Swiper(".mainSwiper", {
		pagination: {
			el: ".swiper-pagination",
			type: "fraction",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});


	
	// mobile navigation
	$(".nav-menu").html($("#gnb").html());
	$(".m-util").html($(".util").html());
	$(".foot-sns").html($(".util").html());
	$(".btn-m-menu").click(function(e){
		e.preventDefault();
		if($("html").hasClass("menu-opened")){
			$("html").removeClass("menu-opened");
		}else{			
			$("html").addClass("menu-opened"); 
		}
	});

	$(".mobile-overlay, .mobile-navigation .close").click(function(){				
		$("html").removeClass("menu-opened");
	});
	
	
	$(".mobile-navigation nav > ul > li > a").click(function(){ 
		t = $(this).parent('li'); 
		if (t.hasClass('active')) { 
			t.removeClass('active'); 
			t.find('.submenu').slideUp('fast'); 
			return false; 
		}else { 
			$(".mobile-navigation nav li").removeClass('active'); 
			t.addClass('active'); 
			if(t.find('div').hasClass('submenu')){ 
				$(".mobile-navigation nav .submenu").slideUp('fast');			 
				t.find('.submenu').slideDown('fast'); 
				return false; 
			}	 
		} 
	}); 

	// lnb
	var lnbIndex = $(".lnb").find("li.active").index();
	var lnbSwiper = new Swiper('.lnb .swiper', {
			slidesPerView: 'auto',
			initialSlide: lnbIndex
	});

	// fancybox
	$(".pop_privacy").fancybox({
		padding     : 0,
		margin      : 10,
		fitToView	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		type		: 'ajax',
		helpers:  {
			overlay: {
				locked: false
			}
		}
	});

	$(".pop_email").fancybox({
		padding     : 0,
		margin      : 10,
		fitToView	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		type		: 'ajax',
		helpers:  {
			overlay: {
				locked: false
			}
		}
	});

	

	// scroll event
	$(window).bind("load scroll", function(){
		var headH = $("#header").height();
		if($(document).scrollTop() > headH){
			$("html").addClass("header-fixed");
		}else{
			$("html").removeClass("header-fixed");
		}
	});


	//jQuery(".lnb li").css("width",100/jQuery(".lnb li").length+"%");
	// 파트너
	

	
	//텝
	jQuery(".tab-content").hide();
	jQuery("ul.tabs>li:first").addClass("active").show(); 	
	jQuery(".tab-content:first").show();

	jQuery("ul.tabs>li").click(function(e) {
		e.preventDefault();

		jQuery("ul.tabs>li").removeClass("active");
		jQuery(this).addClass("active");
		jQuery(".tab-content").hide();		
		
		var activeTab = jQuery(this).find("a").attr("href");
		jQuery(activeTab).fadeIn();
		return false;
	});
	
	//swiper
	if(jQuery(window).width() <= 640) {
	var menuIdx = $(".lnb .swiper-slide.active").index();
		var swiper = new Swiper('.lnb', {
			slidesPerView: 'auto',
			preventClicks: false,
			initialSlide: menuIdx
		});	
		
	}

	// $(".main-visual .items").slick({ 
   	// 	autoplay: true, 
   	// 	fade : true, 
   	// 	infinite: true, 
   	// 	slidesToShow: 1, 
   	// 	slidesToScroll: 1, 
   	// 	pauseOnHover:false, 
   	// 	speed : 800, 
   	// 	autoplaySpeed: 4000, 
   	// 	arrows:true, 
   	// 	dots: false 
   	// });
	
	// datepicker
	$(".datepicker").datepicker({
		dateFormat: 'yy-mm-dd' //Input Display Format 변경
		,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
		,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시         
		//,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
		,prevText: "이전달"
		,nextText: "다음달"
		,buttonText: "날짜선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
		,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
		,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
		,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
		,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
		,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
	}); 

	$(".datepicker2").datepicker({
		dateFormat: 'yy-mm-dd' //Input Display Format 변경
		,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
		,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시    
		,changeMonth: true //월 선택 표시
		,changeYear: true //년도 선택 표시
		,minDate: '-100y' // 현재날짜로부터 100년이전까지 년을 표시
		,yearRange: 'c-100:c+10' // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
		,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
		,prevText: "이전달"
		,nextText: "다음달"
		,buttonText: "날짜선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
		,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
		,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
		,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
		,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
	}); 

	// input
	$("input[type=tel], input[numberOnly]").on("keyup", function() {
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});

	// sub visual
	jQuery(".sub-visual").addClass("load");
	
});	//End

// WOW
// new WOW().init();

$(window).bind("load resize", function(){
	stageResize();
});

function stageResize(){
	winH = $(window).height(),
	docH = $(document).height(),
	headH = $("#header").outerHeight(),
	subvisH = $(".sub-visual").outerHeight(),
	menuH = $(".lnb").outerHeight(),
	footH = $("#footer").outerHeight();

	$("#sub #container").css("min-height",winH-headH-subvisH-menuH-footH);

}