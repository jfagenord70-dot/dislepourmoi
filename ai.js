let lastIntent = "";

export async function getAIReply(message) {
  const text = normalize(message);
  const { intent, reply } = decideReply(text);

  let finalReply = reply;

  if (intent === lastIntent) {
    finalReply = diversify(intent);
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

function decideReply(text) {
  // SALUTATIONS (FR + KREYOL)
  if (
    ["salut", "yo", "bonjour", "bonjou", "sak pase", "sakapase"].includes(text)
  ) {
    return {
      intent: "greeting",
      reply: "Bonjou 👋 / Salut 🙂 kijan ou ye jodi a ?"
    };
  }

  // ÇA VA / MWEN BYEN
  if (
    text.includes("ca va") ||
    text.includes("mwen byen") ||
    text.includes("mwen byen") ||
    text.includes("trankil") ||
    text.includes("tranquille")
  ) {
    return {
      intent: "status",
      reply: "Sa fè m plezi 😊 tout bagay trankil. E ou menm ?"
    };
  }

  // ECHEC / RATE
  if (
    text.includes("rate") ||
    text.includes("echwe") ||
    text.includes("mwen rate") ||
    text.includes("mwen echwe")
  ) {
    return {
      intent: "failure",
      reply:
        "😌 Pa dekouraje. Rater fè pati chemen an. Ki sa ou ta renmen amelyore ?"
    };
  }

  // ETAT EMOTIONNEL
  if (
    text.includes("pa byen") ||
    text.includes("fatige") ||
    text.includes("tris") ||
    text.includes("stress")
  ) {
    return {
      intent: "emotion",
      reply:
        "Mwen konprann 🤍 pran tan w. Ou ka di m sa k ap pase si ou vle."
    };
  }

  // MESSAGE TROP COURT
  if (text.length < 3) {
    return {
      intent: "short",
      reply: "Hmm 🤔 di m yon ti kras plis."
    };
  }

  // DEFAULT
  return {
    intent: "other",
    reply:
      "Mwen la pou t koute 👂. Explike m sa pi byen, m ap suiv ou."
  };
}

function diversify(intent) {
  const variants = {
    greeting: [
      "Hey 👋 kijan jounen an ye ?",
      "Bonjou 🙂 kontan tande w",
      "Salut, m ap koute w"
    ],
    status: [
      "Sa bon 😊 e moral la ?",
      "Dakò 👍 ou santi w byen vrèman ?",
      "Mwen kontan tande sa"
    ],
    failure: [
      "Tout moun rate yon jou 💪",
      "Pa prese, ou sou bon wout la",
      "Erè se pwofesè 👌"
    ],
    emotion: [
      "Pran souf 😌 m ap koute w",
      "Ou pa poukont ou",
      "Pale, sa ka soulaje"
    ],
    other: [
      "Mwen konprann 👀 kontinye",
      "Sa enteresan, di m plis",
      "M ap suiv refleksyon w"
    ]
  };

  const list = variants[intent] || variants.other;
  return list[Math.floor(Math.random() * list.len*]()
