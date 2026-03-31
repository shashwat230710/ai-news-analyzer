const axios = require("axios");
const { callLLM } = require("./llmService");

const GNEWS_API_KEY = process.env.GNEWS_API_KEY;

// 🔥 Extract better search keywords
function extractKeywords(text) {
  return text
    .replace(/[^a-zA-Z0-9 ]/g, "") // remove symbols
    .split(" ")
    .filter(word => word.length > 3) // remove small words
    .slice(0, 6) // keep top keywords
    .join(" ");
}

async function verifyClaim(claim) {
  try {
    // 🔥 Handle very long claims
    if (claim.length > 150) {
      return {
        claim,
        verification: {
          status: "Uncertain",
          confidence: 40,
          explanation: "Claim too complex to verify reliably"
        }
      };
    }

    // 🔥 Convert claim → keywords
    const keywords = extractKeywords(claim);

    // 🔍 Search using GNews
    const response = await axios.get(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        keywords
      )}&lang=en&max=3&apikey=${GNEWS_API_KEY}`
    );

    const articles = response.data.articles || [];

    // 🔥 If no sources found
    if (articles.length === 0) {
      return {
        claim,
        verification: {
          status: "Uncertain",
          confidence: 30,
          explanation: "No reliable news sources found for this claim"
        }
      };
    }

    // 🧠 Prepare source text for LLM
    const sourcesText = articles
      .map((a, i) => `${i + 1}. ${a.title} - ${a.source.name}`)
      .join("\n");

    // 🧠 LLM reasoning
    const prompt = `
Claim: "${claim}"

Sources:
${sourcesText}

Classify the claim as:
- Verified
- False
- Uncertain

Also return:
- confidence (0–100)
- explanation

Return ONLY JSON:
{
  "status": "...",
  "confidence": number,
  "explanation": "..."
}
`;

    const result = await callLLM(prompt);

    let parsed;

    try {
      parsed = JSON.parse(
        result.replace(/```json/g, "").replace(/```/g, "").trim()
      );
    } catch {
      parsed = {
        status: "Uncertain",
        confidence: 50,
        explanation: "Could not parse AI response"
      };
    }

    return {
      claim,
      sources: articles,
      verification: parsed
    };

  } catch (error) {
    console.error("Verification error:", error.message);

    return {
      claim,
      verification: {
        status: "Uncertain",
        confidence: 20,
        explanation: "Verification system error"
      }
    };
  }
}

module.exports = { verifyClaim };