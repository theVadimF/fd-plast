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
  noSwiping: true,
  noSwipingClass: 'swiper-slide',
  direction: 'vertical',
  width: '100%',
  slidesPerView: 3,
  slidesPerGroup: 3,
  navigation: {
    nextEl: '.dealers_slider_wrap .pagination .next',
    prevEl: '.dealers_slider_wrap .pagination .back',
  },
  on: {
    afterInit: function() {
      let slide_count = this.slides.length;
      let per_view = this.slidesPerViewDynamic();
      let page_count = Math.ceil(slide_count / per_view);
      for(let i = 1; i <= page_count; ++i) {
        $('.dealers_slider_wrap .pagination .numbers').append(
          `<button class="page_btn main_text transparent_btn" data-pos="${(i-1)*page_count}">${i}</button>`
        );
      }
      $('.dealers_slider_wrap .pagination .numbers button:first-child').addClass('__active');
    },
    transitionEnd: function() {
      let per_page = this.slidesPerViewDynamic();
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
  const swiper = new Swiper(this, {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 18,
    navigation: {
      nextEl: '.index_press .slider_wrap .nav.next',
      prevEl: '.index_press .slider_wrap .nav.prev',
    },
  });
})

$('.docs_block .choose').click(function() {
  console.log($(this).data('type'));
  let type = $(this).data('type')
  $('.docs_block .email_form').data("type", type);
  $('.docs_block .email_form').fadeIn();
})

$('.docs_block .email_form .close').click(function() {
  $(this).parent().fadeOut();
})