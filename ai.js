// ai.js — Dislepourmoi (FR / KREYOL clean & logique)

export function getAIReply(input) {
  if (!input) {
    return "M ap la pou koute w 🙂";
  }

  const text = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  // =====================
  // === DETECT LANGUE ===
  // =====================
  const isKreyol =
    text.includes("mwen") ||
    text.includes("pa") ||
    text.includes("byen") ||
    text.includes("fatige") ||
    text.includes("rate") ||
    text.includes("sak pase") ||
    text.includes("kijan");

  // =====================
  // ===== KREYOL =========
  // =====================
  if (isKreyol) {
    if (text.includes("pa byen")) {
      return "😔 M ap tande w… Ou vle pale m de sa k ap pase ?";
    }

    if (text.includes("fatige")) {
      return "😌 Sa rive tout moun. Ki sa k ap fatige w konsa ?";
    }

    if (text.includes("rate")) {
      return "💙 Rater fè pati chemen an. Sa w ta renmen amelyore ?";
    }

    if (text.includes("mwen byen") || text === "byen") {
      return "😊 Mwen kontan tande sa. Ki sa ki fè w santi w byen jodi a ?";
    }

    if (text.includes("salut") || text.includes("bonjou")) {
      return "👋 Bonjou. Kijan ou santi w jodi a ?";
    }

    return "👀 Mwen la, kontinye pale avè m.";
  }

  // =====================
  // ===== FRANÇAIS ======
  // =====================
  if (text.includes("pas bien")) {
    return "😔 Je t’écoute. Tu veux m’expliquer ce qui se passe ?";
  }

  if (text.includes("fatigue") || text.includes("fatigue")) {
    return "😌 La fatigue peut peser. C’est physique ou mental ?";
  }

  if (text.includes("rate") || text.includes("raté")) {
    return "💙 Rater fait partie du chemin. Tu veux t’améliorer sur quoi ?";
  }

  if (text.includes("ca va") || text.includes("ça va")) {
    return "😊 Tant mieux. Qu’est-ce qui te fait te sentir comme ça ?";
  }

  if (
    text.includes("salut") ||
    text.includes("bonjour") ||
    text.includes("bonsoir")
  ) {
    return "👋 Salut ! Comment tu te sens aujourd’hui ?";
  }

  return "👀 Je t’écoute, dis-m’en plus.";
}
