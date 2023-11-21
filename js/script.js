$('.request_slides').each(function() {
  const swiper = new Swiper('.request_slides', {
      autoHeight: true,
  });

  $(this).find('.show_form').click(function() {
    swiper.slideNext();
  })

  $(this).find('.form_back').click(function() {
    swiper.slidePrev();
  })
})