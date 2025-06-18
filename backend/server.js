const express = require("express");
const cors = require("cors");
const path = require("path");
const { getFeeds } = require("../api/scrape");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/api/news", async (req, res) => {
  const data = await getFeeds();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
