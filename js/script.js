$('.request_slides').each(function() {
  const swiper = new Swiper(this, {
    autoHeight: true,
    noSwiping: true,
    noSwipingClass: 'swiper-slide',
    navigation: {
      nextEl: $(this).find('.show_form')[0],
      prevEl: $(this).find('.form_back')[0],
    },
  });
})

// TODO(vf) Make this work with multiple of these
$('.requisites_file').change(function(e){
  let fileName = e.target.files[0].name;
  console.log('The file "' + fileName +  '" has been selected.');
  $('.requisites_label').text("Реквизиты: " + fileName);
});

$('.order_file').change(function(e){
  let fileName = e.target.files[0].name;
  console.log('The file "' + fileName +  '" has been selected.');
  $('.order_lable').text("Заявка: " + fileName);
});

$('.requisites_file_coop').change(function(e){
  let fileName = e.target.files[0].name;
  console.log('The file "' + fileName +  '" has been selected.');
  $('.requisites_label_coop').text("Реквизиты: " + fileName);
});

let adv_slider_div = $('.index_advantages .slides');

const adv_slider = new Swiper(adv_slider_div[0], {
  navigation: {
    nextEl: $(adv_slider_div).find('.next')[0],
    prevEl: $(adv_slider_div).find('.prev')[0],
  },
  pagination: {
    el: $(adv_slider_div).find('.counter')[0],
    type: "fraction",
  },
});

const dealers_outer = new Swiper('.index_dealers', {
  autoHeight: true,
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
});

$('.index_dealers .more_btn').click(function() {
  $(this).siblings('.hidden').addClass('__open');
  $(this).addClass('__hidden');
  dealers_outer.update();
})

const dealers_inner = new Swiper('.dealers_slider', {
  // noSwiping: true,
  direction: 'horizontal',
  // width: 'auto',
  slidesPerView: 2,
  slidesPerGroup: 2,
  breakpoints: {
    800: {
      direction: 'vertical',
      slidesPerView: 3,
      slidesPerGroup: 3,
      // width: 'auto',
      noSwipingClass: 'swiper-slide',
      noSwiping: true,
      navigation: {
        nextEl: '.dealers_slider_wrap .pagination .next',
        prevEl: '.dealers_slider_wrap .pagination .back',
      },
    }
  },
  navigation: {
    nextEl: '.index_dealers .mobile_top .next',
    prevEl: '.index_dealers .mobile_top .prev',
  },
  pagination: {
    el: '.index_dealers .mobile_top .counter',
    type: "fraction",
  },
  on: {
    afterInit: function() {
      let slide_count = this.slides.length;
      // let per_view = this.slidesPerViewDynamic();
      let per_view = 3;
      let page_count = Math.ceil(slide_count / per_view);
      for(let i = 1; i <= page_count; ++i) {
        $('.dealers_slider_wrap .pagination .numbers').append(
          `<button class="page_btn main_text transparent_btn" data-pos="${(i-1)*page_count}">${i}</button>`
        );
      }
      $('.dealers_slider_wrap .pagination .numbers button:first-child').addClass('__active');
    },
    transitionEnd: function() {
      // let per_page = this.slidesPerViewDynamic();
      let per_page = 3;
      let page = Math.ceil(this.realIndex / this.slidesPerViewDynamic());
      $('.dealers_slider_wrap .pagination .numbers .page_btn').removeClass('__active');
      $(`.dealers_slider_wrap .pagination .numbers .page_btn[data-pos="${(page) * per_page}"]`).addClass('__active');
    }
  }
})

$('.dealers_slider_wrap .pagination .numbers .page_btn').click(function() {
  // console.log($(this).data('pos'))
  dealers_inner.slideTo($(this).data('pos'));
  $('.dealers_slider_wrap .pagination .numbers .page_btn').removeClass('__active');
  $(this).addClass('__active');
})

$('.index_dealers .selector_btn').click(function() {
  $('.index_dealers .selector_btn').removeClass('__active');
  $(this).addClass('__active');
  console.log($(this).data('index'));
  dealers_outer.slideTo($(this).data('index'));
})

$('.index_news_slider').each(function() {
  const news_swiper = new Swiper(this, {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 18,
    navigation: {
      nextEl: '.index_press .slider_wrap .nav.next',
      prevEl: '.index_press .slider_wrap .nav.prev',
    },
    pagination: {
      el: '.index_news_slider .counter',
      type: "fraction",
    },
    breakpoints: {
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      600: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
    }
  });

  $('.index_news_slider .mobile_nav .m_nav.next').click(function() {
    news_swiper.slideNext()
  })

  $('.index_news_slider .mobile_nav .m_nav.prev').click(function() {
    news_swiper.slidePrev()
  })
})

$('.docs_block .choose').click(function() {
  $('.popup.__email').fadeIn();
})

$('.docs_block .email_form .close').click(function() {
  $(this).parent().fadeOut();
})

$('footer .go_up').click(function() {
  $('html, body').animate({scrollTop: '0px'}, 500);
})

const about_boxes = new Swiper('.about_boxes .main_swiper', {
  effect: 'fade',
  autoHeight: true,
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
});

$('.about_boxes .about_faq .section .section_btn').click(function() {
  $(this).siblings('.content').slideToggle({
    step: function() {
      about_boxes.update();
    }
  });
})

$('.about_faq .section .section_btn').click(function() {
  $(this).siblings('.content').slideToggle()
})

$('.about_boxes .selectors .selector_btn').click(function() {
  $('.about_boxes .selectors .selector_btn').removeClass('__active');
  $(this).addClass('__active')
  let pos = $(this).data('pos')
  about_boxes.slideTo(pos);
})

const review_slider = new Swiper('.about_contents .reviews .swiper', {
  pagination: {
    el: '.about_contents .reviews .swiper-pagination',
    clickable: true,
  },
});

$('.double_slider').each(function() {
  const info_slider = new Swiper($(this).children('.left_info')[0], {
    navigation: {
      nextEl: $(this).find('.next')[0],
      prevEl: $(this).find('.prev')[0],
    },
    pagination: {
      el: $(this).find('.counter')[0],
      type: "fraction",
    },
  });

  const img_slider = new Swiper($(this).children('.img_slider')[0], {
    // control: info_slider,
    effect: 'fade'
  });

  info_slider.controller.control = img_slider;
})

$('.about_jobs .listings .listing_btn').click(function() {
  $(this).siblings('.content').slideToggle();
})

const history_timeline = new Swiper('.history_timeline', {
  slidesPerView: 3,
  centeredSlides: true,
  navigation: {
    nextEl: '.history_timeline .line_wrap .next',
    prevEl: '.history_timeline .line_wrap .prev',
  },
  breakpoints: {
    1030: {
      slidesPerView: 4,
    }
  },
});

const history_items = new Swiper('.history_items', {
  // noSwiping: true,
  // noSwipingClass: 'swiper-slide',
});

history_timeline.controller.control = history_items;
history_items.controller.control = history_timeline;

const about_shorts = new Swiper('.about_shorts .swiper', {
  freeMode: true,
  slidesPerView: "auto",
  spaceBetween: 20,
})

const docs_slider = new Swiper('.docs_slider', {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: '.docs_block .btn.next',
    prevEl: '.docs_block .btn.prev',
  },
  breakpoints: {
    1100: {
      slidesPerView: 2,
      navigation: {
        nextEl: '.docs_block .btn.next',
        prevEl: '.docs_block .btn.prev',
      },
    }
  },
  pagination: {
    el: '.docs_block .mobile_bottom .counter',
    type: "fraction",
  },
})

$('.docs_block .mobile_bottom .next').click(function() {
  docs_slider.slideNext();
})

$('.docs_block .mobile_bottom .prev').click(function() {
  docs_slider.slidePrev();
})

$('.resume_btn').click(function() {
  $('.popup.__job_form').fadeIn();
})

$('.job_form .form_back').click(function() {
  $('.popup.__job_form').fadeOut();
})

const why_us_slider = new Swiper('.about_why_us .swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: '.about_why_us .buttons .next',
    prevEl: '.about_why_us .buttons .prev',
  },
  breakpoints: {
    1300: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    880: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    }
  },
  pagination: {
    el: '.about_why_us .nav_bar .counter',
    type: "fraction",
  },
})

const partner_blocks = new Swiper('.partner_blocks .docs_swiper', {
  autoHeight: true,
  effect: 'fade',
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
})

$('.partner_top .open_tech_doc').click(function() {
  partner_blocks.slideTo(1);
  $([document.documentElement, document.body]).animate({
    scrollTop: $('.partner_blocks').offset().top
  }, 500);
  $('.partner_blocks .selectors .selector_btn').removeClass('__active');
  $('.partner_blocks .selectors .selector_btn[data-pos=1]').addClass('__active');
})

$('.partner_blocks .selectors .selector_btn').click(function() {
  $('.partner_blocks .selectors .selector_btn').removeClass('__active');
  $(this).addClass('__active');
  partner_blocks.slideTo($(this).data('pos'));
})

$('.partner_blocks .documents .load_more').click(function() {
  $(this).addClass('__hidden');
  $(this).siblings('.hidden').addClass('__shown');
  partner_blocks.update();
})

$('.product_card_tech_docs .load_more').click(function() {
  $(this).addClass('__hidden');
  $(this).siblings('.hidden').addClass('__shown');
  partner_blocks.update();
})

const partner_img = new Swiper('.partners_slides .swiper', {
  loop: true,
  centeredSlides: true,
  spaceBetween: -30,
  // spaceBetween: 20,
  slidesPerView: 'auto',
  breakpoints: {
    800: {
      spaceBetween: -60,
    },
  },
  navigation: {
    nextEl: '.partners_slides .swiper .controls .next',
    prevEl: '.partners_slides .swiper .controls .prev',
  },
})

// $('.partners_slides .img').on('transition', function() {
//   console.log('test');
//   partner_img.update();
// })

$('.open_contact').click(function() {
  $('.popup.__contact_form').fadeIn();
})

$('.partner_top .open_patner').click(function() {
  $('.popup.__dealer_form').fadeIn();
})

$('.popup.__dealer_form .request_form .form_back').click(function() {
  $('.popup.__dealer_form').fadeOut();
})

$('.popup.__email .form_back').click(function() {
  $('.popup.__email').fadeOut();
})

const gallery_slider = new Swiper('.product_card_top .main_gallery', {
})

const gallery_thumbs = new Swiper('.product_card_top .gallery_thumbnails', {
  slidesPerView: 'auto',
  spaceBetween: 20,
})

$('.product_card_top .info .option .option_btn').click(function() {
  $(this).siblings('.contents_wrap').children('.contents').slideToggle('fast');
})

$('.product_card_top .info .option .contents .option_selector').click(function() {
  $(this).parent().parent().parent().find('.value').text($(this).text());
  $(this).parent().slideUp();
})

const bought_together_slider = new Swiper ('.bought_together_slider', {
  slidesPerView: 2,
  slidesPerGroup: 2,
  spaceBetween: 20,
  navigation: {
    nextEl: '.bought_together .nav.next',
    prevEl: '.bought_together .nav.prev',
  },
})

const docs_slider_main = new Swiper ('.docs_block .docs_slider_main', {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    1270: {
      slidesPerView: 2,
    }
  },
  navigation: {
    nextEl: '.docs_block .nav_line .nav.next',
    prevEl: '.docs_block .nav_line .nav.prev',
  },
  pagination: {
    el: '.docs_block .nav_line .counter',
    type: "fraction",
  },
})