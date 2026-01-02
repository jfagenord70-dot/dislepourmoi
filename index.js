import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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

// ✅ CHAT API (SMART REPLIES)
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  let reply = "Message reçu : " + message;

  const msg = message.toLowerCase();

  if (msg.includes("salut") || msg.includes("bonjour")) {
    reply = "Salut 👋 comment je peux t’aider ?";
  } else if (msg.includes("comment ça va")) {
    reply = "Ça va très bien 💪 et toi ?";
  } else if (msg.includes("merci")) {
    reply = "Avec plaisir 😊";
  }

  res.json({ reply });
});

// Frontend fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log("SERVER OK on port", PORT);
});
