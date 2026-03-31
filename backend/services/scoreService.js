function calculateScore(results, bias) {
  try {
    let totalClaims = results.length;
    let verified = 0;
    let uncertain = 0;
    let failed = 0;

    results.forEach((r) => {
      if (r.verification?.status === "Verified") verified++;
      else if (r.verification?.status === "Uncertain") uncertain++;
      else failed++;
    });

    // 🧠 Claim score (0–50)
    let claimScore = (verified / totalClaims) * 50;

    // ⚖️ Bias penalty (0–20)
    let biasPenalty =
      bias.political_bias === "Neutral" ? 20 : 10;

    // 📢 Propaganda penalty (0–15)
    let propagandaScore = 15 - (bias.propaganda_score / 100) * 15;

    // 🌐 Source reliability (0–15)
    let sourceScore = results.filter(r => r.sources?.length > 0).length;
    sourceScore = (sourceScore / totalClaims) * 15;

    // 🎯 Final score
    let finalScore =
      claimScore + biasPenalty + propagandaScore + sourceScore;

    finalScore = Math.round(finalScore);

    // 🏷️ Verdict
    let verdict = "Unreliable";

    if (finalScore > 75) verdict = "Highly Reliable";
    else if (finalScore > 50) verdict = "Moderately Reliable";
    else if (finalScore > 30) verdict = "Low Reliability";

    return {
      credibility_score: finalScore,
      verdict,
      breakdown: {
        claimScore,
        biasPenalty,
        propagandaScore,
        sourceScore
      }
    };

  } catch (error) {
    console.error("Scoring error:", error);

    return {
      credibility_score: 50,
      verdict: "Unknown",
    };
  }
}

module.exports = { calculateScore };