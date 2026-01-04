// index.js — Dislepourmoi BACKEND (FINAL, IA-READY)

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
   HEALTH CHECK (OPTIONNEL)
========================= */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =========================
   API CHAT
========================= */
app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body?.message;

    // Sécurité légère (non bloquante)
    if (!message || typeof message !== "string") {
      return res.json({
        reply: "🫂 Mwen la pou koute w. Eseye ekri mesaj ou ankò."
      });
    }

    // ⚠️ IMPORTANT : appel ASYNC
    const reply = await getAIReply(message);
    return res.json({ reply });

  } catch (err) {
    console.error("CHAT ERROR:", err);
    return res.json({
      reply: "😔 Gen yon ti pwoblèm. Ann eseye ankò."
    });
  }
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("✅ SERVER OK on port", PORT);
});
