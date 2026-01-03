import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(__dirname));

// API CHAT
app.post("/api/chat", (req, res) => {
  const message = req.body.message || "";
  const msg = message.toLowerCase();

  let reply = "🤖 J’ai bien reçu ton message.";

  if (msg.includes("salut") || msg.includes("bonjour")) {
    reply = "Salut 👋 comment ça va ?";
  } 
  else if (msg.includes("ça va") || msg.includes("ca va")) {
    reply = "Ça va tranquille 😌 et toi ?";
  } 
  else if (msg.includes("raté") || msg.includes("rate")) {
    reply = "😅 J’ai bien reçu « j’ai raté », mais t’inquiète, on apprend tous.";
  }

  res.json({ reply });
});

// Frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("SERVER OK on port", PORT);
});
