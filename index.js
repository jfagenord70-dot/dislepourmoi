import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

// Fix __dirname (ES module)
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

// 🤖 CHAT API INTELLIGENT
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message manquant ❌" });
  }

  const msg = message.toLowerCase();
  let reply = "";

  if (msg.includes("salut") || msg.includes("bonjour")) {
    reply = "Salut 👋 comment ça va ?";
  } 
  else if (msg.includes("comment") && msg.includes("va")) {
    reply = "Ça va bien, merci 🙏 Et toi ?";
  }
  else if (msg.includes("aide")) {
    reply =
      "📌 Commandes disponibles :\n" +
      "- salut\n" +
      "- comment ça va\n" +
      "- aide";
  }
  else if (msg.includes("merci")) {
    reply = "Avec plaisir 😄";
  }
  else {
    reply = `🤔 J’ai bien reçu : "${message}", mais je suis encore en apprentissage.`;
  }

  res.json({ reply });
});

// 🔁 FRONTEND FALLBACK
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`SERVER OK on port ${PORT}`);
});
