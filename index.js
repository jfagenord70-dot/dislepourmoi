app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Message manquant." });
  }

  const msg = message.toLowerCase();
  let reply = "";

  if (msg.includes("salut") || msg.includes("bonjour") || msg.includes("yo")) {
    reply = "Salut 👋 comment je peux t’aider ?";
  } 
  else if (msg.includes("comment") && msg.includes("va")) {
    reply = "Ça va très bien 💪 et toi ?";
  } 
  else if (msg.includes("aide")) {
    reply = "Dis-moi ce dont tu as besoin, je suis là.";
  } 
  else if (msg.includes("merci")) {
    reply = "Avec plaisir 😊";
  } 
  else if (msg.includes("fatigu")) {
    reply = "Repose-toi un peu, tu l’as mérité.";
  } 
  else {
    reply = "Je t’ai lu. Dis-m’en plus 👀";
  }

  res.json({ reply });
});
