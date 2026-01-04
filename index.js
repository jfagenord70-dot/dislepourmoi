// index.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import getAIReply from "./ai.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());
app.use(express.static(__dirname));

/* =========================
   API CHAT
========================= */
app.post("/api/chat", (req, res) => {
  const message = req.body?.message;

  // 🔒 Sécurité minimale (PAS BLOQUANTE)
  if (!message || typeof message !== "string") {
    return res.json({
      reply: "🫂 Mwen la. Eseye ekri mesaj ou ankò."
    });
  }

  try {
    const reply = getAIReply(message);
    return res.json({ reply });
  } catch (err) {
    console.error("AI ERROR:", err);
    return res.json({
      reply: "😔 Gen yon ti pwoblèm. Ann eseye ankò."
    });
  }
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});
