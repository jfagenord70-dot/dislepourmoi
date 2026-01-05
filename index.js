import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Pour __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 MIDDLEWARES
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ✅ ROUTE API
app.post("/api/chat", (req, res) => {
  const { message, lang } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message vide." });
  }

  // Réponse simple (test stabilité)
  let reply = "👂 Je t’écoute.";

  if (lang === "kr") {
    reply = "👂 Mwen la, pale avè m.";
  }

  res.json({ reply });
});

// ✅ ROUTE FRONTEND (OBLIGATOIRE)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ PORT RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});
