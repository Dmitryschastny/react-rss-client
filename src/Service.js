async function getFeed(feedUrl) {
  let Parser = require("rss-parser");
  let parser = new Parser({
    customFields: {
      item: [["enclosure", { keepArray: true }]]
    }
  });

  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  if (feedUrl) {
    try {
      return await parser.parseURL(CORS_PROXY + feedUrl);
    } catch (err) {
      console.log(err);
      return null;
    }
  } else {
    return;
  }
}

export default {
  getFeed
}