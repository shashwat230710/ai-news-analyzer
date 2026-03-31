Automated Context & Bias Analysis Engine Moving beyond basic binary classifiers for fake news, this platform analyzes an entire article's context, cross-references claims in real-time, and generates a detailed credibility report. Core Capabilities:
Context Understanding
Understands article meaning (not just keywords)
Uses transformer models (like BERT or GPT)
Real-time Fact Verification
Cross-checks claims with:
News APIs
Knowledge bases (e.g., Wikipedia, fact-check APIs)
Example: If article says “X event happened”, it verifies from multiple sources
Bias Detection
Detects:
Political bias
Emotional tone
Propaganda patterns
Credibility Report (Not just label) Output is like:
Credibility Score (0–100)
Key claims extracted
Verified vs unverified claims
Bias level
Source reliability
give full detailed plan to make this app which live hosting link and Best LLM and Good UI. This is a major project so divide it into multiple weeks of works starting today. And make it full free for me. First give me plan then when i ask for code afterward.


Week 1-5:
🧠 OVERALL IDEA (What your system does)

Your project is:

🧾 AI system that reads a news article → understands it → checks facts → detects bias → gives analysis

Instead of:
❌ “Fake / Real”

You built:
✅ “Explain WHY it is reliable or not”

🚀 WEEK 1: Backend + AI Connection
🎯 What you did
Created a backend using Node.js + Express
Connected AI using OpenRouter
⚙️ Flow
User input → API → LLM → Response
💡 Example

Input:

“India launched a mission”

Output:

AI gives summary

🧠 What you learned
How to call LLM using API
How to build backend routes
How to send/receive JSON
🚀 WEEK 2: Real News Input (URL Support)
🎯 What you did
Instead of typing text, user can paste news URL
Extract article content using scraping
⚙️ Flow
URL → Website → Extract text → Send to AI
🛠 Tools
axios
cheerio
💡 Example

Input:

BBC news link

Output:

Full article text extracted

🧠 What you learned
Web scraping basics
Handling messy HTML data
🚀 WEEK 3: CLAIM EXTRACTION (CORE STEP)
🎯 What you did
Broke article into important factual statements (claims)
⚙️ Flow
Article → AI → Extract claims
💡 Example

Article:

“India launched Chandrayaan…”

Output:

[
  "India launched Chandrayaan-3",
  "Mission cost $75 million"
]
🧠 Why this is IMPORTANT

Instead of analyzing whole article:
👉 You analyze each fact individually

This makes your system:

more accurate
explainable
🧠 What you learned
Prompt engineering
Handling bad AI outputs
JSON parsing + fallback logic
🚀 WEEK 4: FACT VERIFICATION (REAL AI PART)
🎯 What you did
Checked each claim using real-world data
⚙️ Flow
Claim → Search news → AI compares → Result
🛠 Tool used
GNews API
💡 Example

Claim:

“Refinery in Israel caught fire”

System:

Searches news
Gets articles
AI compares

Output:

{
  "status": "Uncertain",
  "confidence": 60
}
🧠 What you learned
API integration
Multi-source verification
LLM reasoning (very important)
🚀 WEEK 5: BIAS + SENTIMENT + PROPAGANDA
🎯 What you did

Analyzed the tone of the article

⚙️ Flow
Article → AI → Bias + Emotion + Propaganda
💡 Output
{
  "political_bias": "Neutral",
  "sentiment": "Negative",
  "emotional_intensity": "Medium",
  "propaganda_score": 15
}
🧠 What each means
Feature	Meaning
Political bias	Left / Right / Neutral
Sentiment	Positive / Negative tone
Emotional intensity	Calm vs dramatic
Propaganda score	Manipulation level
🧠 What you learned
AI can analyze tone
Articles are not just facts—they carry bias
No ML training needed
🔗 FINAL PIPELINE (Week 1–5 Combined)
User gives URL
        ↓
Extract article text
        ↓
Extract claims (facts)
        ↓
Verify each claim (news API + AI)
        ↓
Analyze bias & tone
        ↓
Return structured result
🎯 WHAT MAKES YOUR PROJECT STRONG
✅ Not basic ML
No dataset training
Fully real-time
✅ Explainable AI

Instead of:
❌ “Fake”

You show:
✔ Claims
✔ Sources
✔ Reasoning

✅ Real-world system design

You used:

APIs
LLMs
modular services
⚠️ CURRENT LIMITATIONS (IMPORTANT FOR INTERVIEW)

Be honest about these:

Some claims are vague → hard to verify
News API may not return results
LLM may give imperfect reasoning

👉 This shows you understand real-world AI

🧠 HOW TO EXPLAIN IN INTERVIEW (SHORT VERSION)

Say this:

“I built an AI-based news analysis system that extracts factual claims from articles, verifies them using live news sources, and analyzes bias and sentiment. Instead of just classifying news as fake or real, it provides an explainable credibility report with supporting evidence.”

🚀 NEXT (YOU ALREADY STARTED)

Week 6:
👉 Credibility Score (final decision layer)

Week 7:
👉 Frontend UI (visual dashboard)

🎯 SUMMARY (SUPER SIMPLE)
Week	What you built
Week 1	AI backend
Week 2	URL → article
Week 3	Claim extraction
Week 4	Fact verification
Week 5	Bias detection