import express from "express";

const app = express();

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  const msg = message.toLowerCase();

  let reply = "Je t’ai bien reçu 😉";

  if (msg.includes("salut") || msg.includes("bonjour")) {
    reply = "Salut 👋 comment ça va ?";
  } 
  else if (msg.includes("ça va") || msg.includes("comment ça va")) {
    reply = "Ça va bien merci 🙌 et toi ?";
  } 
  else if (msg.includes("raté") || msg.includes("rate")) {
    reply = "😅 J’ai bien reçu « " + message + " », mais t’inquiète, on apprend tous.";
  } 
  else if (msg.includes("merci")) {
    reply = "Avec plaisir 😄";
  }

  res.json({ reply });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("SERVER OK on port " + PORT);
});
