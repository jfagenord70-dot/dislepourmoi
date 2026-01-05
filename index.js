import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// __dirname pour ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir le frontend
app.use(express.static(path.join(__dirname, "public")));

// Fallback vers index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("SERVER OK on port", PORT);
});
