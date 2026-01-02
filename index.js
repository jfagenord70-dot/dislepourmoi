const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/chat", (req, res) => {
  const message = String(req.body.message || "").toLowerCase();
  let reply = "Avance maintenant.";

  if (message.includes("rate")) {
    reply = "Identifie une erreur et corrige-la aujourd hui.";
  } else if (message.includes("fatigu")) {
    reply = "Prends dix minutes de pause puis reprends une tache simple.";
  } else if (message.includes("aide")) {
    reply = "Choisis une action precise et fais-la maintenant.";
  } else if (message.includes("peur") || message.includes("stress")) {
    reply = "Respire, decide et passe a l action.";
  }

  reply = reply.split(".")[0] + ".";
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log("SERVER OK");
});
