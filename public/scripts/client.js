$().ready(() => {
  $('#tweet-form').submit(handleSubmit);

  //load old tweets on startup
  loadTweets();
});

const handleSubmit = function (e) {
  e.preventDefault();

  // validate data before posting
  if (validateData()) return;

  const data = $(this).serialize();
  submitData(data, e);

  $('.new-tweet').slideToggle('fast');
};

const validateData = () => {
  const $tweetValue = $('#tweet-text').val().trim();
  const $errorMessage = $('#error-msg');

  if ($tweetValue === null || $tweetValue.length === 0) {
    return $errorMessage.text('Please write something.').slideDown('fast');
  } else if ($tweetValue.length > 140) {
    return $errorMessage.text('Too long! Please limit your chars to 140').slideDown('fast');
  }
  return false;
};

const submitData = (data, event) => {
  $.post('/tweets', data).then(() => {
    event.target.reset();
    loadTweets();
  });
};

//escape chars to prevent XSS attack
const escapeChars = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetData) => {
  const formatDate = timeago.format(tweetData.created_at);
  // return tweet article
  return $(`
      <article class="tweet">
        <header>
          <div class="user">
            <img class="avatar" src=${tweetData.user.avatars} alt="avatar of user" />
            <div class="user-name">${tweetData.user.name}</div>
          </div>
          <span class="user-handle">${tweetData.user.handle}</span>
        </header>
        <p class="content">${escapeChars(tweetData.content.text)}</p>
        <hr />
        <footer>
          <div class="time">${formatDate}</div>
          <div class="icon-tray"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>
        </footer>
      </article>
    `);
};

const renderTweets = (tweets) => {
  //empty old tweets object to avoid duplication
  $('#tweets-container').text('');
  tweets.map((tweet) => {
    $('#tweets-container').prepend(createTweetElement(tweet));
  });
};

const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' }).then((tweetData) => {
    // console.log(tweetData);
    renderTweets(tweetData);
  });
};
