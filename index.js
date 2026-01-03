import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware JSON
app.use(express.json());

// Servir fichiers statiques (HTML, CSS, JS)
app.use(express.static(__dirname));

// Test API
app.get("/api/test", (req, res) => {
  res.json({ status: "ok", message: "API connected successfully" });
});

// Chat API
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message manquant" });
  }
  res.json({ reply: "Message reçu : " + message });
});

// Frontend fallback (CRUCIAL)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log("SERVER OK on port " + PORT);
});
