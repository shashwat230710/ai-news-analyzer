const axios = require("axios");
const cheerio = require("cheerio");

async function extractArticle(url) {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    let articleText = "";

    $("p").each((i, el) => {
      articleText += $(el).text() + " ";
    });

    articleText = articleText.replace(/\s+/g, " ").trim();

    return articleText.slice(0, 5000);
  } catch (error) {
    console.error("Article extraction error:", error.message);
    return null;
  }
}

module.exports = { extractArticle };