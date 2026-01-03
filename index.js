const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(__dirname));

// TEST API
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "API connected successfully",
  });
});

// CHAT API
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }

  let reply = "Message reçu : " + message;
  const msg = message.toLowerCase();

  if (msg.includes("salut") || msg.includes("bonjour")) {
    reply = "Salut 👋 comment je peux t’aider ?";
  } else if (msg.includes("comment")) {
    reply = "Ça va très bien 💪 et toi ?";
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
