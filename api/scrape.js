const Parser = require("rss-parser");
const parser = new Parser();

async function getFeeds() {
  const [standard, nyt] = await Promise.all([
    parser.parseURL("https://www.standardmedia.co.ke/rss/headlines.php"),
    parser.parseURL("https://rss.nytimes.com/services/xml/rss/nyt/World.xml")
  ]);

  return {
    standard: standard.items.slice(0, 5),
    nyt: nyt.items.slice(0, 5)
  };
}

module.exports = { getFeeds };
