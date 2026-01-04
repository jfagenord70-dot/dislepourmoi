import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getAIReply } from "./ai.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message vide." });
  }

  try {
    const reply = await getAIReply(message);
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
