import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import getAIReply(message, lang);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/chat", async (req, res) => {
  const { message, lang } = req.body;

  // 🔒 FORCER la langue venant du bouton
  const forcedLang = lang === "fr" ? "fr" : "kr";

  const reply = await getAIReply(message, forcedLang);
  res.json({ reply });
});



