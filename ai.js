// ai.js

let conversationLang = null; // "fr" | "kr"

function detectLanguage(text) {
  const kreyolWords = [
    "mwen", "byen", "pa", "fatige", "rate", "sak", "pase", "kijan", "ou", "sa"
  ];

  const lower = text.toLowerCase();

  for (const w of kreyolWords) {
    if (lower.includes(w)) return "kr";
  }

  return "fr";
}

export default function getAIReply(text) {
  const clean = text.toLowerCase().trim();

  // 🔒 Langue fixée au premier message
  if (!conversationLang) {
    conversationLang = detectLanguage(clean);
  }

  /* =========================
     🇭🇹 KREYÒL
  ========================= */
  if (conversationLang === "kr") {
    if (clean.includes("byen") && !clean.includes("pa")) {
      return "😊 Mwen kontan tande sa. Ki sa ki fè w santi w byen jodi a ?";
    }

    if (clean.includes("pa byen")) {
      return "😔 M ap tande w… Ou vle pale m de sa k ap pase ?";
    }

    if (clean.includes("fatige")) {
      return "😌 Sa rive tout moun. Ki sa k ap fatige w konsa ?";
    }

    if (clean.includes("rate")) {
      return "💙 Rater fè pati chemen an. Sa w ta renmen amelyore ?";
    }

    return "👂 Mwen la, pale avè m. Pran tan w.";
  }

  /* =========================
     🇫🇷 FRANÇAIS
  ========================= */
  if (clean.includes("ça va")) {
    return "😊 Tant mieux. Qu’est-ce qui te fait te sentir comme ça ?";
  }

  if (clean.includes("fatigu")) {
    return "😌 La fatigue peut peser. C’est plutôt physique ou mental ?";
  }

  if (clean.includes("rat")) {
    return "💙 Rater fait partie du chemin. Tu veux t’améliorer sur quoi ?";
  }

  return "👂 Je t’écoute. Prends ton temps.";
}
