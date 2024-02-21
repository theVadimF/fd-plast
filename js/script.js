$('.request_slides:not(.__vertical)').each(function() {
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

$('.request_slides.__vertical').each(function() {
  const swiper_vertical = new Swiper(this, {
    autoHeight: true,
    noSwiping: true,
    direction: 'vertical',
    noSwipingClass: 'swiper-slide',
    slidesPerView: "auto",
    initialSlide: 2,
    navigation: {
      nextEl: $(this).find('.show_form')[0],
      prevEl: $(this).find('.form_back')[0],
    },
  });
})

$('.request_form .file').each(function() {
  $(this).change(function(e) {
    let fileName = e.target.files[0].name;
    $('label[for="' + $(this).attr('id') + '"]').text($(this).data('doc') + ': ' + fileName);
  })
})

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
    transitionStart: function() {
      // let per_page = this.slidesPerViewDynamic();
      let per_page = 3;
      let page = Math.ceil(this.realIndex / this.slidesPerViewDynamic());
      $('.dealers_slider_wrap .pagination .numbers .page_btn').removeClass('__active');
      $(`.dealers_slider_wrap .pagination .numbers .page_btn[data-pos="${(page) * per_page}"]`).addClass('__active');
    }
  }
})

$('.dealers_slider_wrap .pagination .next').click(function() {
  dealers_inner.slideNext();
})

$('.dealers_slider_wrap .pagination .back').click(function() {
  dealers_inner.slidePrev();
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
    autoHeight: false,
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

const faq_slides = new Swiper('.about_faq .faq_slides', {
  effect: 'fade',
  autoHeight: true,
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
});

$('.about_faq .right .faq_categories .faq_category').click(function() {
  faq_slides.slideTo($(this).data('pos'));
  $('.about_faq .section .content').slideUp({
    step: function() {
      about_boxes.update();
      faq_slides.update();
    }
  })
  $('.about_faq .right .faq_categories .faq_category').removeClass('__active');
  $(this).addClass('__active');
})

$('.about_faq .section .section_btn').click(function() {
  if ($(this).parents('.about_boxes').length) {
    $(this).siblings('.content').slideToggle({
      step: function() {
        about_boxes.update();
        faq_slides.update();
      }
    });
  } else {
    $(this).siblings('.content').slideToggle()
  }
  $(this).toggleClass('__open');
})

// $('.about_faq .section .section_btn').click(function() {
//   $(this).siblings('.content').slideToggle();
// })

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
  const info_slider = new Swiper($(this).find('.left_info')[0], {
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
  img_slider.controller.control = info_slider;
})

$('.about_jobs .listings .listing_btn').click(function() {
  $(this).siblings('.content').slideToggle();
  $(this).toggleClass('__open');
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
    el: '.about_docs_block .mobile_bottom .counter',
    type: "fraction",
  },
})

$('.docs_block .mobile_bottom .next').click(function() {
  docs_slider.slideNext();
})

$('.about_docs_block .mobile_bottom .next').click(function() {
  docs_slider.slideNext();
})

$('.about_docs_block .btn.next').click(function() {
  docs_slider.slideNext();
})

$('.docs_block .mobile_bottom .prev').click(function() {
  docs_slider.slidePrev();
})

$('.about_docs_block .btn.prev').click(function() {
  docs_slider.slidePrev();
})

$('.about_docs_block .mobile_bottom .prev').click(function() {
  docs_slider.slidePrev();
})

$('.resume_btn').click(function() {
  $('.popup.__job_form').fadeIn();
})

$('.popup .form_back').click(function() {
  $(this).parents('.popup').fadeOut();
})

$('.open_info_form').click(function() {
  $('.popup.__info_form').fadeIn();
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

$('.partner_blocks .product_card_tech_docs .load_more').click(function() {
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

$('.product_card_top .gallery .gallery_thumb').click(function() {
  gallery_slider.slideTo($(this).data('pos'))
})

$('.product_card_top .info .option .option_btn').click(function() {
  $(this).siblings('.contents_wrap').children('.contents').slideToggle('fast');
})

$('.product_card_top .info .option .contents .option_selector').click(function() {
  $(this).parent().parent().parent().find('.value').text($(this).text());
  $(this).parent().slideUp();
})

$('.fav_items .item .option .option_btn').click(function() {
  $(this).siblings('.contents_wrap').children('.contents').slideToggle('fast');
})

$('.fav_items .item .option .contents .option_selector').click(function() {
  $(this).parent().parent().parent().find('.value').text($(this).text());
  $(this).parent().slideUp();
})

const bought_together_slider = new Swiper ('.bought_together_slider', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
  navigation: {
    nextEl:   '.bought_together .nav.next',
    prevEl: '.bought_together .nav.prev',
  },
  breakpoints: {
    1300: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    }
  }
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

const product_card_slider = new Swiper('.product_card_boxes .product_card_slider', {
  autoHeight: true,
  effect: 'fade',
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
})

$('.product_card_boxes .selector_btn').click(function() {
  $('.product_card_boxes .selector_btn').removeClass('__active');
  $(this).addClass('__active');
  product_card_slider.slideTo($(this).data('pos'));
})

$('.product_card_slider .product_card_tech_docs .load_more').click(function() {
  $(this).addClass('__hidden');
  $(this).siblings('.hidden').addClass('__shown');
  product_card_slider.update();
})

const product_card_big = new Swiper('.product_card_big .big_slider', {
  effect: 'fade',
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
})

$('.product_card_big .selector').click(function() {
  $('.product_card_big .selector').removeClass('__active');
  $(this).addClass('__active');
  product_card_big.slideTo($(this).data('pos'));
})

$('.fav_add_popup .close').click(function() {
  $('.popup.__fav_add').fadeOut();
})

$('.bought_together .card .bottom .add_to_order').click(function() {
  $('.popup.__fav_add').fadeIn();
})

const recent_slider = new Swiper ('.recents .recent_slider', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '.recents .nav.next',
    prevEl: '.recents .nav.prev',
  },
  breakpoints: {
    1500: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    950: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    }
  }
})

$('.fav_items .open_request_invoice').click(function() {
  $('.popup.__invoice_form').fadeIn();
})

$('.popup.__invoice_form .form_back').click(function() {
  $('.popup.__invoice_form').fadeOut();
});

$(document).ready(function() {
  $('.city_list .city_search').on('keyup', function() {
    $('.city_list .city_search').val($(this).val());
    let value = $(this).val().toLowerCase();
    $('.city_list .city_btn').filter(function() {
      let text = $(this)
      $(this).toggle(text.text().toLowerCase().indexOf(value) > -1);
    })
  })
})

$('header .location_picker').click(function() {
  $('header .popup_prompt.__location').fadeToggle();
})

$('header .popup_prompt .city_picker .top_section .buttons .open_cities').click(function() {
  $('header .popup_prompt .city_picker .city_list').removeClass('__hidden');
})

// function toggleCatalog(obj) {
//   if ($(this).hasClass('__open')) {
//     console.log('1')
//     $('header .products').fadeOut();
//     $(this).removeClass('__open');
//   } else {
//     console.log('2')
//     $('header .products').fadeIn();
//     $(this).addClass('__open');
//   }
// }

function isTouchEvent() {
  return 'ontouchstart' in document.documentElement
         || navigator.maxTouchPoints > 0
         || navigator.msMaxTouchPoints > 0;
}

$('.open_header_catalog').click(function() {
  if ($(this).hasClass('__open')) {
    $('header .products').removeClass('__open');
    $(this).removeClass('__open');
  } else {
    $('header .request_popup').removeClass('__open');
    $('header .products').addClass('__open');
    $(this).addClass('__open');
  }
})

$('.open_header_catalog').on('mouseover', function() {
  if (!isTouchEvent() && !$('header .request_popup').hasClass('__open')) {
    $('header .products').addClass('__open');
    $(this).addClass('__open');
  }
})

$('.open_header_catalog').on('mouseleave', function(e) {
  if ($(e.relatedTarget).parents('.products').length === 0 &&
      $('header .open_header_catalog').hasClass('__open')) {
    $('header .open_header_catalog').removeClass('__open');
    $('header .products').removeClass('__open');
  }
})

$('header .products').on('mouseleave', function() {
  if ($('header .open_header_catalog').hasClass('__open')) {
    $('header .open_header_catalog').removeClass('__open');
    $('header .products').removeClass('__open');
  }
})

$('header .popup_prompt .city_picker .topper .close_city_picker').click(function() {
  $('header .popup_prompt.__location').fadeOut();
})

$('header .fav_items .top .close').click(function() {
  $('.popup_prompt.__likes').fadeOut();
})

$('header .header_likes').click(function() {
  $('.popup_prompt.__likes').fadeToggle();
})

$('.close_mobile_menu').click(function() {
  $('.mobile_menu').fadeOut();
})

$('.mobile_menu_open').click(function() {
  $('.mobile_menu').fadeIn();
})

$('.close_cookie').click(function() {
  $('.cookies_popup').fadeOut();
})

if ($('.blocks.fade .block').length) {
  const fade_duration = 400;
  const fade_start = 200;

  document.addEventListener('scroll', () => {
    let window_bottom = window.scrollY + window.innerHeight;

    $('.blocks.fade .block').each(function() {
      let offset = window_bottom - $(this).offset().top - fade_start;
      let opacity = 0;
      if (offset < 0) {
        opacity = 0;
      }
      if (offset > fade_duration) {
        opacity = 1;
      } else {
        opacity = offset / fade_duration;
      }
      $(this).css('opacity', opacity);
    })
  })
}

$('.about_top .about_counters .counter .top_section .number:not(.__decimal)').each(function () {
  var $this = $(this);
  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
    duration: 1500,
    // easing: 'swing',
    step: function () {
      $this.text(Math.ceil(this.Counter));
    }
  });
});

$('.about_top .about_counters .counter .top_section .number.__decimal').each(function () {
  var $this = $(this);
  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
    duration: 1500,
    // easing: 'swing',
    step: function () {
      $this.text(this.Counter.toFixed(1));
    }
  });
});

$('header .open_request').click(function() {
  $('header .products').removeClass('__open');
  $('header .open_header_catalog').removeClass('__open');
  $('header .request_popup').toggleClass('__open');
})

$('header .request_popup .form_back').click(function() {
  $('header .request_popup').removeClass('__open')
})

new Swiper('.big_slider', {
  pagination: {
    el: '.big_slider .swiper-pagination',
    clickable: true,
  },
  on: {
    afterInit: function() {
      let video = $(this.slidesEl).find('.swiper-slide-active').children('video');
      if (video.length > 0) {
        video[0].play();
      }
    },
    transitionEnd: function() {
      let video = $(this.slidesEl).find('.swiper-slide-active').children('video');
      $(this.slidesEl).find('video').each(function() {
        this.pause();
        this.currentTime = 0;
      })
      if (video.length > 0) {
        video[0].play();
      }
    },
  }
});

const big_gallery = new Swiper('.big_gallery_slider', {
  navigation: {
    nextEl: '.gallery_popup .gallery .gallery_nav.__next',
    prevEl: '.gallery_popup .gallery .gallery_nav.__prev',
  },
  autoHeight: true,
  // height: '100%',
  breakpoints: {
    800: {
      autoHeight: true,
    }
  },
})

$('.gallery_popup .gallery .big_gallery_thumbs .big_thumb_btn').click(function() {
  big_gallery.slideTo($(this).data('pos'));
})

$('.gallery_popup .shade').click(function() {
  $('.gallery_popup').removeClass('__shown');
})

$('.gallery_popup .close_gallery').click(function() {
  $('.gallery_popup').removeClass('__shown');
})

$('.product_card_top .gallery .gallery_img').click(function() {
  // console.log(gallery_slider.activeIndex);
  big_gallery.slideTo(gallery_slider.activeIndex, 0);
  $('.gallery_popup').addClass('__shown');
})