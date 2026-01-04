// ai.js

export default function getAIReply(text) {
  const msg = text.toLowerCase().trim();

  const isKreyol = detectKreyol(msg);
  const isFrench = detectFrench(msg);

  if (isKreyol && !isFrench) {
    return replyKreyol(msg);
  }

  if (isFrench && !isKreyol) {
    return replyFrench(msg);
  }

  // fallback si mixte ou inconnu
  return "🫂 M ap koute w. Ou ka eksplike m plis ?";
}

/* =========================
   🔍 DÉTECTION LANGUE
========================= */

function detectKreyol(text) {
  const keywords = [
    "mwen", "byen", "pa byen", "fatige", "rate",
    "sa va", "kijan", "kisa", "pase", "trankil",
    "m ap", "mwen pa", "sak pase"
  ];
  return keywords.some(k => text.includes(k));
}

function detectFrench(text) {
  const keywords = [
    "je", "ça va", "pas bien", "fatigué",
    "raté", "comment", "pourquoi", "parce que"
  ];
  return keywords.some(k => text.includes(k));
}

/* =========================
   🇭🇹 RÉPONSES KREYÒL
========================= */

function replyKreyol(text) {
  if (text.includes("mwen byen")) {
    return "😊 Mwen kontan tande sa. Ki sa ki fè w santi w byen jodi a ?";
  }

  if (text.includes("mwen pa byen")) {
    return "😔 M ap tande w… Ou vle pale m de sa k ap pase ?";
  }

  if (text.includes("mwen fatige")) {
    return "😌 Sa rive tout moun. Ki sa k ap fatige w konsa ?";
  }

  if (text.includes("mwen rate")) {
    return "💙 Rater fè pati chemen an. Sa w ta renmen amelyore ?";
  }

  return "🫂 Mwen la pou koute w. Kontinye pale avè m.";
}

/* =========================
   🇫🇷 RÉPONSES FRANÇAIS
========================= */

function replyFrench(text) {
  if (text.includes("ça va")) {
    return "😊 Tant mieux. Qu’est-ce qui te fait te sentir comme ça ?";
  }

  if (text.includes("pas bien")) {
    return "😔 Je t’écoute… tu veux m’expliquer ce qui se passe ?";
  }

  if (text.includes("fatigué")) {
    return "😌 La fatigue peut peser. C’est plutôt physique ou mental ?";
  }

  if (text.includes("raté")) {
    return "💙 Rater fait partie du chemin. Tu veux t’améliorer sur quoi ?";
  }

  return "🫂 Je suis là pour t’écouter. Dis-m’en plus.";
}
