// run this file after html is loaded
$().ready(() => {
  $('#tweet-text').on('input', function () {
    let wordLimit = 140;
    let $counter = $(this).parent().find('.counter');

    //decrease counter on every char.
    wordLimit -= $(this).val().length;
    $counter.val(wordLimit);

    // hide error message if any
    $('#error-msg').slideUp('slow');
    $counter.removeClass('red-counter');

    if (parseInt($counter.val()) < 0) {
      $counter.addClass('red-counter');
    }
  });
});
