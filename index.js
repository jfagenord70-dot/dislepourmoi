import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Pour __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// ===== ROUTES API =====

// Test API
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "API connected successfully",
  });
});

// Chat API (CE QUE LE BOUTON UTILISE)
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  res.json({
    reply: `Message reçu : ${message}`,
  });
});

// ===== FRONTEND =====
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`SERVER OK on port ${PORT}`);
});

