// run this file after html is loaded
$().ready(() => {
  $('#tweet-text').on('input', function () {
    let wordLimit = 140;
    let $counter = $(this).parent().find('.counter');

    if (parseInt($counter.val()) <= 0) {
      $counter.addClass('red-counter');
    }

    //decrease counter on every char.
    wordLimit -= $(this).val().length;
    return $counter.val(wordLimit);
  });
});
