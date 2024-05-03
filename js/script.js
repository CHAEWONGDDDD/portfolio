new Swiper(".sw-visual", {
  autoplay: true,
  loop: true,
  slidesPerView: "auto",
  speed: 1000,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

$(function () {
  const firstMenu = $("nav>ul>li"),
    header = $("header");
  headerHeight = header.outerHeight(); //border까지 포함된 hdight
  console.log(firstMenu);
  firstMenu.mouseenter(function () {
    // 요소명.each(function(){
    //     $(this).find('ul').css('display','none') //this는 각각
    // })
    // firstMenu.find("ul").css("display", "none");
    firstMenu.find("ul").stop().hide();
    let currentMenu = $(this);
    let subHeight = currentMenu.find("ul").outerHeight(); //nav ul li ul 그리고 123+subHeight
    // header.css('height',`${}px`) //css에서 transition을 줘야한다
    // header.animate({}); //js에서 transition을 줄 수 있음
    // 요소명.animate({속성: 속성값}, duration time)
    // header.animate({scrollTop:0},300) //gotop버튼할때 이렇게 줬음
    header.stop().animate({ height: headerHeight + subHeight + "px" }, 300);
    $(this).find("ul").stop().show();
    currentMenu
      .siblings()
      .find("ul") //currentMenu의 형제들을 제외한 나머지 ul들
      .stop().hide; // stop, hide 해준다
  });
  firstMenu.mouseleave(function () {
    header.stop().animate({ height: headerHeight + "px" }, 300);
    $(this).find("ul").stop().hide();
  });
  const mb_bt = $(".mb-bt"),
    mb_nav = $(".mb-nav"),
    mb_menu_mask = $(".mb-menu-mask");
  mb_bt.click(function (e) {
    e.preventDefault();
    mb_nav.toggleClass("active");
    mb_menu_mask.toggleClass("active");
    mb_bt.toggleClass("active");
    mb_menu_li.height(54);
  });

  // 모바일 서브메뉴 펼치기(아코디언) 기능
  const mb_menu_li = $(".mb-main-menu"),
    mb_mainMenu = $(".mb-main-menu > a"),
    mb_submenu = $(".mb-sub-menu");
  let mb_submenu_height = [];

  // 서브메뉴의 높이값을 계산하여 배열값으로 저장
  mb_submenu.each(function (index) {
    let count = $(this).find("li").length;
    mb_submenu_height[index] = 54 * count;
  });

  mb_mainMenu.each(function (index) {
    $(this).click(function (e) {
      e.preventDefault();
      $(this).toggleClass("open");
      let isOpen = $(this).hasClass("open");
      if (isOpen) {
        mb_menu_li.height(54);
        let temp = mb_submenu_height[index];
        mb_menu_li.eq(index).height(temp + 54);
      } else {
        mb_menu_li.eq(index).height(54);
      }
    });
  });
  const f_site = $(".family-site span"),
    f_menu = $(".fmenu");
  f_site.click(function (e) {
    e.preventDefault();
    f_menu.toggleClass("active");
  });
  $(".gotop").click(function () {
    $("html").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
});
