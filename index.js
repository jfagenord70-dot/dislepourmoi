
const express = require("express");
const path = require("path");

const app = express();

// =========================
// MIDDLEWARES
// =========================
app.use(express.json());

// =========================
// ROUTES API
// =========================
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "API connected successfully"
  });
});

// =========================
// FRONTEND (STATIC FILES)
// =========================
app.use(express.static(path.join(__dirname, "frontend")));

// =========================
// FALLBACK (SPA support)
// =========================
app.get("*", (req, res) => {
  res.sen
