export default function getAIReply(input, lang = "kr") {
  let clean = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  if (lang === "kr") {
    if (
      clean.includes("mwen bye") ||
      clean.includes("mwen byen") ||
      clean.includes("ca va") ||
      clean.includes("ça va")
    ) {
      return "😊 Mwen kontan tande sa. Ki sa ki fè w santi w byen jodi a ?";
    }
    if (clean.includes("pa byen") || clean.includes("pas bien")) {
      return "😔 M ap tande w… Ou vle pale m de sa k ap pase ?";
    }
    if (clean.includes("fatige") || clean.includes("fatigu")) {
      return "😌 Sa rive tout moun. Ki sa k ap fatige w konsa ?";
    }
    if (clean.includes("rate") || clean.includes("raté")) {
      return "💙 Rater fè pati chemen an. Sa w ta renmen amelyore ?";
    }
    if (clean.includes("salut") || clean.includes("bonjour") || clean.includes("bonjou")) {
      return "👋 Bonjou. Kijan ou santi w jodi a ?";
    }
    return "👂 Mwen la, pale avè m. Pran tan w.";
  }

  // 🇫🇷 FR
  if (clean.includes("ca va") || clean.includes("ça va")) {
    return "😊 Tant mieux. Qu’est-ce qui te fait te sentir comme ça ?";
  }
  if (clean.includes("pas bien")) {
    return "😔 Je t’écoute. Tu veux m’expliquer ce qui se passe ?";
  }
  if (clean.includes("fatigu")) {
    return "😌 La fatigue peut peser. C’est plutôt physique ou mental ?";
  }
  if (clean.includes("rate") || clean.includes("raté")) {
    return "💙 Rater fait partie du chemin. Tu veux t’améliorer sur quoi ?";
  }
  if (clean.includes("salut") || clean.includes("bonjour")) {
    return "👋 Salut ! Comment tu te sens aujourd’hui ?";
  }
  return "👂 Je t’écoute. Prends ton temps.";
}
