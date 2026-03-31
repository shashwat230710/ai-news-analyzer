const axios = require("axios");
const cheerio = require("cheerio");

async function extractArticle(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);

    let articleText = "";

    $("article p").each((i, el) => {
      articleText += $(el).text() + " ";
    });

    // fallback if <article> not found
    if (!articleText) {
      $("p").each((i, el) => {
        articleText += $(el).text() + " ";
      });
    }

    articleText = articleText.replace(/\s+/g, " ").trim();

    return articleText.slice(0, 5000);

  } catch (error) {
    console.error("Extraction error:", error.message);
    return null;
  }
}

module.exports = { extractArticle };