// run this file after html is loaded
$().ready(() => {
  $('#tweet-text').on('input', function () {
    let wordLimit = 140;
    let $counter = $(this).parent().find('.counter');

    //decrease counter on every char.
    wordLimit -= $(this).val().length;
    $counter.val(wordLimit);

    if (parseInt($counter.val()) < 1) {
      $counter.addClass('red-counter');
    }
  });
});
