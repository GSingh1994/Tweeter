$().ready(() => {
  $('#tweet-text').on('input', onInput);
});

const onInput = function () {
  let wordLimit = 140;
  let $counter = $(this).parent().find('.counter');

  //decrease counter on every char.
  wordLimit -= $(this).val().length;
  $counter.val(wordLimit);

  // hide error message if any
  $('#error-msg').slideUp('fast');
  $counter.removeClass('red-counter');

  if (parseInt($counter.val()) < 0) {
    $counter.addClass('red-counter');
  }
};
