import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

// Pour __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(__dirname));

// ===== TEST API =====
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "API connected successfully"
  });
});

// ===== CHAT API =====
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  res.json({
    reply: `Message reçu : ${message}`
  });
});

// ===== FRONTEND (OBLIGATOIRE POUR PAGE BLANCHE) =====
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log("SERVER OK on port " + PORT);
});
