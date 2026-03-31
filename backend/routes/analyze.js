const express = require("express");
const router = express.Router();
const { analyzeBias } = require("../services/biasService");
const { extractArticle } = require("../services/articleService");
const { extractClaims } = require("../services/claimService");
const { verifyClaim } = require("../services/verificationService");
const { calculateScore } = require("../services/scoreService");

router.post("/", async (req, res) => {
  const { text, url } = req.body;

  let content = text;

  try {
    // Step 1: Extract article if URL
    if (url) {
      content = await extractArticle(url);

      if (!content) {
        return res.status(400).json({
          error: "Failed to extract article",
        });
      }
    }

    if (!content) {
      return res.status(400).json({
        error: "Text or URL required",
      });
    }

    // Step 2: Extract claims
    const claims = await extractClaims(content);

    // Step 3: Verify claims (parallel for speed)
    const results = await Promise.all(
      claims.map((claim) => verifyClaim(claim))
    );
    
    // 🔥 Bias analysis (whole article)
    const bias = await analyzeBias(content);
    // Step 5: Score (CORRECT PLACE)
    const score = calculateScore(results, bias);
    res.json({
      success: true,
      results,
      bias,
      score
    });
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;