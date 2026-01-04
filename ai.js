// ai.js — Dislepourmoi FINAL

let conversationLang = null; // "kr" | "fr"

/* =========================
   🛠️ AUTOCORRECTION SIMPLE
========================= */
function autocorrect(text) {
  const fixes = {
    "bye": "byen",
    "fatiger": "fatige",
    "fatiguee": "fatigue",
    "ratee": "rate",
    "rater": "rate",
    "sa va": "ça va"
  };

  return text
    .split(" ")
    .map(word => fixes[word] || word)
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

  for (const w of kreyolWords) {
    if (text.includes(w)) return "kr";
  }

  return "fr";
}

/* =========================
   🤖 MAIN FUNCTION
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

  clean = autocorrect(clean);

  // 🔒 Lang fixée au premier message
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

    if (clean === "mwen byen") {
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
      return "💙 Rater fait partie du
