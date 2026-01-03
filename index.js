import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// =======================
// CONFIG ES MODULE
// =======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================
// APP
// =======================
const app = express();
const PORT = process.env.PORT || 10000;

// =======================
// MIDDLEWARES
// =======================
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// =======================
// TEST API
// =======================
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "API connected successfully",
  });
});

// =======================
// CHAT API
// =======================
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message manquant",
    });
  }

  res.json({
