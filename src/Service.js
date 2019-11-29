const Parser = require('rss-parser');

async function getFeed(feedUrl) {
  const parser = new Parser({
    customFields: {
      item: [['enclosure', { keepArray: true }]]
    },
  });

  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
  // const CORS_PROXY = 'https://crossorigin.me/';

  if (feedUrl) {
    try {
      return await parser.parseURL(CORS_PROXY + feedUrl);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  return null;
}

export default {
  getFeed,
};
