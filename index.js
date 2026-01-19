const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

// JSON middleware
app.use(express.json());

// ROUTES AVANT static 👈👈👈
app.get("/ping", (req, res) => {
  res.send("pong");
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ reply: "Message manquant" });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: userMessage,
    });

    const reply = response.output_text;
    console.log("IA:", reply);

    res.json({ reply });
  } catch (err) {
    console.error("ERREUR IA:", err);
    res.status(500).json({ reply: "Erreur IA" });
  }
});

// STATIC EN DERNIER 👈
app.use(express.static("public"));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("SERVER OK on port", PORT);
});
