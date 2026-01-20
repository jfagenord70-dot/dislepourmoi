import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Support ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// TEST
app.get("/ping", (req, res) => {
  res.send("pong");
});

// CHAT API
app.post("/chat", async (req, res) => {
  res.json({ reply: "Salut ! Comment puis-je t’aider ?" });
});

// SERVIR FRONTEND
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// START SERVER
app.listen(PORT, () => {
  console.log("EXPRESS SERVER STARTED ON PORT", PORT);
});
