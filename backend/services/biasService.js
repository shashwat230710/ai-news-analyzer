const { callLLM } = require("./llmService");

async function analyzeBias(articleText) {
  try {
    const prompt = `
Analyze the following news article for bias and tone.

Return ONLY JSON:

{
  "political_bias": "Left / Right / Neutral",
  "sentiment": "Positive / Negative / Neutral",
  "emotional_intensity": "Low / Medium / High",
  "propaganda_score": number (0-100),
  "explanation": "short explanation"
}

Article:
${articleText}
`;

    const response = await callLLM(prompt);

    let cleaned = response.trim();
    cleaned = cleaned.replace(/```json/g, "").replace(/```/g, "");

    let result;

    try {
      result = JSON.parse(cleaned);
    } catch {
      result = {
        political_bias: "Neutral",
        sentiment: "Neutral",
        emotional_intensity: "Medium",
        propaganda_score: 50,
        explanation: "Could not parse AI response"
      };
    }

    return result;

  } catch (error) {
    console.error("Bias analysis error:", error);

    return {
      political_bias: "Neutral",
      sentiment: "Neutral",
      emotional_intensity: "Medium",
      propaganda_score: 50,
      explanation: "Error analyzing bias"
    };
  }
}

module.exports = { analyzeBias };