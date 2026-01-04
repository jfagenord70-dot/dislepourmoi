// ai.js — Dislepourmoi logic (FR + KREYOL)

export function getAIReply(input) {
  if (!input) {
    return "M ap la pou koute w. Pale avè m 🙂";
  }

  const text = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  // === SALUTATIONS ===
  if (
    text.includes("salut") ||
    text.includes("bonjour") ||
    text.includes("bonsoir") ||
    text.includes("bonjou")
  ) {
    return "👋 Salut ! Comment tu te sens aujourd’hui ?";
  }

  // === BIEN / PAS BIEN (KREYOL) ===
  if (
    text.includes("mwen byen") ||
    text.includes("m byen") ||
    text.includes("sa bon")
  ) {
    return "😊 Mwen kontan tande sa. Ki sa ki fè w santi w byen jodi a ?";
  }

  if (
    text.includes("mwen pa byen") ||
    text.includes("m pa byen") ||
    text.includes("pa two byen") ||
    text.includes("pa bon")
  ) {
    return "😔 M ap tande w… Ou vle pale m de sa k ap pase ?";
  }

  // === RATE / DIFFICULTÉ ===
  if (
    text.includes("rate") ||
    text.includes("difisil") ||
    text.includes("fatige")
  ) {
    return "😌 T’inquiète, rater fait partie du chemin. Tu veux t’améliorer sur quoi ?";
  }

  // === QUESTION OU OUVERTURE ===
  if (
    text.includes("?") ||
    text.startsWith("poukisa") ||
    text.startsWith("kijan") ||
    text.startsWith("comment")
  ) {
    return "🤔 Bon kestyon. Explike m yon ti kras plis.";
  }

  // === DEFAULT (DERNIER RECOURS) ===
  return "👀 Mwen konprann… kontinye pale avè m, m ap koute w.";
}
