import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// ⬇️ CORS OBLIGATWA
app.use(cors());
app.use(express.json());

// === OPENAI ===
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// === ROUTES API AVANT STATIC ===
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Erreur IA" });
  }
});

// === STATIC FRONTEND ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// === START SERVER ===
app.listen(PORT, () => {
  console.log("🔥 EXPRESS SERVER STARTED on port", PORT);
});
