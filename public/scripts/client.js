$().ready(() => {
  //escape chars to prevent XSS attack
  const escape = (str) => {
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
        <p class="content">${escape(tweetData.content.text)}</p>
        <hr />
        <footer>
          <div class="time">${formatDate}</div>
          <div class="icon-tray"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>
        </footer>
      </article>
    `);
  };

  const renderTweets = (tweets) => {
    tweets.map((tweet) => {
      $('#tweets-container').prepend(createTweetElement(tweet));
    });
  };

  $('#tweet-form').submit(function (e) {
    e.preventDefault();

    // validate data before posting
    const tweetValue = $('#tweet-text').val().trim();
    if (tweetValue === null || tweetValue.length === 0) {
      return alert("Tweet can't be empty");
    }
    const data = $(this).serialize();
    $.post('/tweets', data).then(() => {
      e.target.reset();
      loadTweets();
    });
  });

  const loadTweets = () => {
    $.ajax('/tweets', { method: 'GET' }).then((tweetData) => {
      renderTweets(tweetData);
    });
  };
  loadTweets();
});
