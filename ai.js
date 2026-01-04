// ai.js — Dislepourmoi FINAL (AUTO-SWITCH)

let conversationLang = null; // "kr" | "fr"

/* =========================
   🔍 DETECTION LANGUE
========================= */
function detectLanguage(text) {
  const kreyolWords = [
    "mwen", "byen", "bye", "pa", "fatige", "rate",
    "kijan", "kisa", "sak", "pase", "santi"
  ];

  const frenchWords = [
    "je", "tu", "ça", "va", "pas", "bien",
    "fatigu", "raté", "pourquoi", "comment"
  ];

  let krScore = kreyolWords.filter(w => text.includes(w)).length;
  let frScore = frenchWords.filter(w => text.includes(w)).length;

  if (krScore > frScore) return "kr";
  if (frScore > krScore) return "fr";

  return null;
}

/* =========================
   🤖 MAIN
========================= */
export default function getAIReply(input) {
  if (!input || typeof input !== "string") {
    return "🫂 Mwen la pou koute w.";
  }

  let clean = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const detectedLang = detectLanguage(clean);

  // 🔁 AUTO-SWITCH si la langue est claire
  if (!conversationLang && detectedLang) {
    conversationLang = detectedLang;
  } else if (detectedLang && detectedLang !== conversationLang) {
    conversationLang = detectedLang;
  }

  /* =========================
     🇭🇹 KREYÒL
  ========================= */
  if (conversationLang === "kr") {

    if (clean.includes("mwen bye") || clean.includes("mwen byen")) {
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

    if (clean.includes("salut") || clean.includes("bonjou")) {
      return "👋 Bonjou. Kijan ou santi w jodi a ?";
    }

    return "👂 Mwen la, pale avè m. Pran tan w.";
  }

  /* =========================
     🇫🇷 FRANÇAIS
  ========================= */
  if (conversationLang === "fr") {

    if (clean.includes("pas bien")) {
      return "😔 Je t’écoute. Tu veux m’expliquer ce qui se passe ?";
    }

    if (clean.includes("fatigu")) {
      return "😌 La fatigue peut peser. C’est plutôt physique ou mental ?";
    }

    if (clean.includes("rate") || clean.includes("raté")) {
      return "💙 Rater fait partie du chemin. Tu veux t’améliorer sur quoi ?";
    }

    if (clean.includes("ca va") || clean.includes("ça va")) {
      return "😊 Tant mieux. Qu’est-ce qui te fait te sentir comme ça ?";
    }

    if (clean.includes("salut") || clean.includes("bonjour")) {
      return "👋 Salut ! Comment tu te sens aujourd’hui ?";
    }

    return "👂 Je t’écoute. Prends ton temps.";
  }

  return "Je suis là pour toi.";
}
