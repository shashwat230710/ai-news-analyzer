const { callLLM } = require("./llmService");

async function extractClaims(articleText) {
  try {
    const prompt = `
Extract 5 clear, factual, verifiable claims from the article.

Rules:
- Each claim must be specific
- Include names, places, or numbers if possible
- Keep each claim short
- Return ONLY a JSON array

Example:
["India launched Chandrayaan-3 on 14 July 2023"]

Article:
${articleText}
`;

    const response = await callLLM(prompt);

    let cleaned = response.trim();

    // remove markdown formatting
    cleaned = cleaned.replace(/```json/g, "").replace(/```/g, "");

    let claims = [];

    try {
      claims = JSON.parse(cleaned);
    } catch (err) {
      console.log("⚠️ Raw LLM output:", cleaned);

      // 🔥 FALLBACK (VERY IMPORTANT)
      claims = cleaned
        .split("\n")
        .filter(line => line.length > 20)
        .slice(0, 5);
    }

    return claims;
  } catch (error) {
    console.error("Claim extraction error:", error);
    return [];
  }
}

module.exports = { extractClaims };