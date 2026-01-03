import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname));

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message vide" });
  }

  let reply = `J’ai bien reçu « ${message} », mais j’apprends encore 🙂`;

  if (message.toLowerCase().includes("salut")) {
    reply = "Salut 👋 comment ça va ?";
  } else if (message.toLowerCase().includes("ça va")) {
    reply = "Ça va tranquille 😌 et toi ?";
  } else if (message.toLowerCase().includes("raté")) {
    reply = "T’inquiète, on apprend tous 💪";
  }

  res.json({ reply });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("SERVER OK on port", PORT);
});
