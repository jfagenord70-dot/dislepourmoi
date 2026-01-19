import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());

// ================== ROUTES AVANT STATIC ==================

// TEST
app.get("/ping", (req, res) => {
  res.send("pong");
});

// CHAT
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message vide" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("❌ ERREUR CHAT:", err);
    res.status(500).json({ reply: "Erreur IA" });
  }
});

// ================== STATIC APRÈS ==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log("🔥 EXPRESS SERVER STARTED on port", PORT);
});
