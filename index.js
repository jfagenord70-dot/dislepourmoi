
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001;

// Fix __dirname (Render / ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(__dirname));

// ✅ TEST API
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "API connected successfully",
  });
});

// ✅ CHAT API
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message manquant" });
  }

  const msg = message.toLowerCase();
  let reply = "";

  if (msg.includes("salut") || msg.includes("bonjour")) {
    reply = "Salut 👋 comment je peux t’aider ?";
  } else if (msg.includes("comment") && msg.includes("va")) {
    reply = "Ça va très bien 💪 et toi ?";
  } else if (msg.includes("aide")) {
    reply = "Je peux discuter avec toi ou t’aider sur le site 😊";
  } else {
    reply = `J’ai bien reçu ton message : ${message}`;
  }

  res.json({ reply });
});

