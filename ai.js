// ai.js — Dislepourmoi FINAL FIX 100%

let conversationLang = null; // "kr" | "fr"

/* =========================
   🛠️ AUTOCORRECTION AVANT TOUT
========================= */
function autocorrect(text) {
  const fixes = {
    "bye": "byen",
    "fatiger": "fatige",
    "ratee": "rate",
    "rater": "rate",
    "sa va": "ça va"
  };

  return text
    .split(/\s+/)
    .map(w => fixes[w] || w)
    .join(" ");
}

/* =========================
   🔍 DETECTION LANGUE
========================= */
function detectLanguage(text) {
  const kreyolWords = [
    "mwen", "byen", "pa", "fatige", "rate",
    "kijan", "kisa", "sak", "pase", "santi"
  ];
  return kreyolWords.some(w => text.includes(w)) ? "kr" : "fr";
}

/* =========================
   🤖 MAIN FUNCTION
========================= */
export default function getAIReply(input) {
  if (!input || typeof input !== "string") {
    return "🫂 Mwen la pou koute w.";
  }

  // 🔹 Normalisation
  let clean = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  // 🔹 AUTOCORRECT D’ABORD
  clean = autocorrect(clean);

  // 🔒 Langue verrouillée APRÈS autocorrect
  if (!conversationLang) {
    conversationLang = detectLanguage(clean);
  }

  /* =========================
     🇭🇹 KREYÒL (LOCK)
  ========================= */
  if (conversationLang === "kr") {

    if (clean.includes("pa byen")) {
      return "😔 M ap tande w… Ou vle pale m de sa k ap pase ?";
    }

    if (clean.includes("fatige")) {
      return "😌 Sa rive tout moun. Ki sa k ap fatige w konsa ?";
    }

    if (clean.includes("rate")) {
      return "💙 Rater fè pati chemen an. Sa w ta renmen amelyore ?";
    }

    if (clean.includes("mwen byen")) {
      return "😊 Mwen kontan tande sa. Ki sa ki fè w santi w byen jodi a ?";
    }

    if (clean.includes("bonjou") || clean.includes("salut")) {
      return "👋 Bonjou. Kijan ou santi w jodi a ?";
    }

    return "👂 Mwen la, pale avè m. Pran tan w.";
  }

  /* =========================
     🇫🇷 FRANÇAIS (LOCK)
  ========================= */
  if (conversationLang === "fr") {

    if (clean.includes("pas bien")) {
      return "😔 Je t’écoute. Tu veux m’expliquer ce qui se passe ?";
    }

    if (clean.includes("fatigu")) {
      return "😌 La fatigue peut peser. C’est plutôt physique ou mental ?";
    }

    if (clean.includes("rate")) {
      return "💙 Rater fait partie du chemin. Tu veux t’améliorer sur quoi ?";
    }

    if (clean.includes("ca va") || clean.includes("ça va")) {
      return "😊 Tant mieux. Qu’est-ce qui te fait te sentir comme ça ?";
    }

    if (clean.includes("bonjour") || clean.includes("salut")) {
      return "👋 Salut ! Comment tu te sens aujourd’hui ?";
    }

    return "👂 Je t’écoute. Prends ton temps.";
  }

  return "Je suis là pour toi.";
}
