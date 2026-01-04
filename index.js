import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import getReply from "./ai.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/chat", (req, res) => {
  const { message, lang } = req.body;

  if (!message || !lang) {
    return res.status(400).json({ reply: "Requête invalide." });
  }

  try {
    const reply = getReply(message, lang);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Erreur serveur." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("SERVER OK on port", PORT);
});
