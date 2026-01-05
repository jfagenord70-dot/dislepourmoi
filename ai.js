// ai.js — Dislepourmoi FINAL (LANGUE FORCÉE PAR CHOIX UTILISATEUR)

let conversationLang = "kr"; // 🔒 FORCÉ PAR LE BOUTON 🇭🇹 Kreyòl

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

  /* =========================
     🇭🇹 KREYÒL — TOUJOURS
  ========================= */

  // POSITIF
  if (
    clean.includes("mwen bye") ||
    clean.includes("mwen byen") ||
    clean.includes("ca va") ||
    clean.includes("ça va")
  ) {
    return "😊 Mwen kontan tande sa. Ki sa ki fè w santi w byen jodi a ?";
  }

  // PAS BIEN
  if (
    clean.includes("pa byen") ||
    clean.includes("pas bien")
  ) {
    return "😔 M ap tande w… Ou vle pale m de sa k ap pase ?";
  }

  // FATIGUE
  if (
    clean.includes("fatige") ||
    clean.includes("fatigu")
  ) {
    return "😌 Sa rive tout moun. Ki sa k ap fatige w konsa ?";
  }

  // ÉCHEC
  if (
    clean.includes("rate") ||
    clean.includes("raté")
  ) {
    return "💙 Rater fè pati chemen an. Sa w ta renmen amelyore ?";
  }

  // SALUTATION
  if (
    clean.includes("salut") ||
    clean.includes("bonjour") ||
    clean.includes("bonjou")
  ) {
    return "👋 Bonjou. Kijan ou santi w jodi a ?";
  }

  // FALLBACK
  return "👂 Mwen la, pale avè m. Pran tan w.";
}
