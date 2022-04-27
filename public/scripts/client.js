$().ready(() => {
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      user: {
        name: 'Newton',
        avatars: 'https://i.imgur.com/73hZDYK.png',
        handle: '@SirIsaac',
      },
      content: {
        text: 'If I have seen further it is by standing on the shoulders of giants',
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: 'Descartes',
        avatars: 'https://i.imgur.com/nlhLi3I.png',
        handle: '@rd',
      },
      content: {
        text: 'Je pense , donc je suis',
      },
      created_at: 1461113959088,
    },
  ];

  const createTweetElement = (tweetData) => {
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
        <div class="time">${tweetData.created_at}</div>
        <div class="icon-tray"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></div>
      </footer>
    </article>`);
  };

  const renderTweets = (tweets) => {
    tweets.map((tweet) => {
      $('#tweets-container').append(createTweetElement(tweet));
    });
  };

  $('#tweet-form').submit((event) => {
    event.preventDefault();
  });

  renderTweets(data);
});
