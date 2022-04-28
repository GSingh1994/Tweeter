$().ready(() => {
  // add fade animation depend on scroll position
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $('#to-top').fadeIn('fast');
    } else {
      $('#to-top').fadeOut('fast');
    }
  });

  $('#to-top').click(function () {
    $('html, body').animate({ duration: 100, scrollTop: 0 }, 1000);

    //open form and focus on click
    $('.new-tweet').slideToggle('fast');
    $('#tweet-text').focus();
  });

  //form slide animation on click
  $('#write-tweet').on('click', () => {
    $('.new-tweet').slideToggle('fast');
    $('#tweet-text').focus();
  });
});
