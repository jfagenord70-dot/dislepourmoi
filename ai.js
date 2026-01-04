let lastIntent = "";

export async function getAIReply(message) {
  const text = normalize(message);
  const { intent, reply } = generateReply(text);

  let finalReply = reply;

  if (intent === lastIntent) {
    finalReply = diversify();
  }

  lastIntent = intent;
  return finalReply;
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function generateReply(text) {
  if (["salut", "yo", "bonjour"].includes(text)) {
    return {
      intent: "greeting",
      reply: "Salut 👋 comment tu te sens aujourd’hui ?"
    };
  }

  if (text.includes("ca va")) {
    return {
      intent: "status",
      reply: "Ça va tranquille 😌 et toi ?"
    };
  }

  if (text.includes("rate")) {
    return {
      intent: "failure",
      reply: "😌 T’inquiète, rater fait partie du chemin. Tu veux t’améliorer sur quoi ?"
    };
  }

  if (text.length < 3) {
    return {
      intent: "short",
      reply: "Hmm 🤔 développe un peu."
    };
  }

  return {
    intent: "other",
    reply: "Je comprends 👀 parle-moi un peu plus."
  };
}

function diversify() {
  const variants = [
    "Je vois ce que tu veux dire 🤝",
    "C’est normal, tout le monde passe par là 💪",
    "T’inquiète, l’important c’est d’avancer 🚀",
    "Explique-moi un peu plus 🙂"
  ];

  return variants[Math.floor(Math.random() * variants.length)];
}
