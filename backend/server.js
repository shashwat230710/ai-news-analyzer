const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");

const app = express();

console.log("Starting server...");

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/analyze", analyzeRoute);

app.get("/", (req, res) => {
  res.send("AI News Analyzer Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});