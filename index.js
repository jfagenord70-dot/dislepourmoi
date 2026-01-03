import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

// Pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

/* =========================
   API TEST
========================= */
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "API connected successfully",
  });
});

/* =========================
   CHAT API
========================= */
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message manquant",
    });
  }

  res.json({
    reply: `Message reçu : ${message}`,
  });
});

/* =========================
   FRONTEND FALLBACK
========================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log("SERVER OK on port", PORT);
});
