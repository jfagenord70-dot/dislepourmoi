const express = require("express");
const path = require("path");

const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(express.json());

// =========================
// API ROUTES (AVANT TOUT)
// =========================
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "API TEST RENDER V2"
  });
});


// =========================
// STATIC FILES (ROOT)
// =========================
app.use(express.static(__dirname));

// =========================
// FALLBACK
// =========================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// =========================
// SERVER
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
