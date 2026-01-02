import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Pour __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Servir le frontend statique
app.use(express.static(__dirname));

/* =========================
   ROUTES API
========================= */

// ✅ TEST API
app.get("/api/test", (req, res) => {
  res.json({
    status: "ok",
    message: "API connected successfully"
  });
});

// ✅ CHAT API (CELLE QUI MANQUAIT)
app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({
      error: "Message vide"
    });
  }

  // Réponse coach strict (simple pour l’instant)
  res.json({
    reply: "Identifie une erreur et corrige-la aujourd’hui."
  });
});

/* =========================
   FALLBACK FRONTEND
========================= */

// Si aucune route API ne matche → frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log("SERVER OK on port", PORT);
});
