$().ready(() => {
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
      <p class="content">${tweetData.content.text}</p>
      <hr />
      <footer>
        <div class="time">${formatDate}</div>
        <div class="icon-tray"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>
      </footer>
    </article>`);
  };

  const renderTweets = (tweets) => {
    tweets.map((tweet) => {
      $('#tweets-container').append(createTweetElement(tweet));
    });
  };

  $('#tweet-form').submit(function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    $.post('/tweets', data);
  });

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' }).then((tweetData) => {
      renderTweets(tweetData);
    });
  };
  loadTweets();
});
