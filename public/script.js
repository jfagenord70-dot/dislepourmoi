// PREUVE DE CHARGEMENT
console.log("SCRIPT JS CHARGÉ");

let currentLang = "fr";

const chat = document.getElementById("chat");
const input = document.getElementById("message");
const form = document.getElementById("chat-form");
const resetBtn = document.getElementById("reset");
const btnFr = document.getElementById("btn-fr");
const btnKr = document.getElementById("btn-kr");

// Langue
btnFr.onclick = () => switchLang("fr");
btnKr.onclick = () => switchLang("kr");

function switchLang(lang) {
  currentLang = lang;
  resetConversation();
  addBot(lang === "fr"
    ? "👋 Salut ! Parle-moi librement."
    : "👋 Bonjou ! Pale avè m libreman."
  );
}

// Envoi
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addUser(text);
  input.value = "";

  const reply = getReply(text);
  addBot(reply);
}

// Reset
resetBtn.addEventListener("click", resetConversation);
function resetConversation() {
  chat.innerHTML = "";
}

// UI
function addUser(text) {
  chat.innerHTML += `<p><b>Toi :</b> ${text}</p>`;
  chat.scrollTop = chat.scrollHeight;
}
function addBot(text) {
  chat.innerHTML += `<p><b>Bot :</b> ${text}</p>`;
  chat.scrollTop = chat.scrollHeight;
}

// Réponses
function getReply(text) {
  const t = text.toLowerCase();

  if (currentLang === "kr") {
    if (t.includes("byen")) return "😊 Mwen kontan tande sa. Ki sa ki fè w santi w byen jodi a ?";
    if (t.includes("pa byen")) return "😔 M ap tande w… Ou vle pale m de sa k ap pase ?";
    if (t.includes("fatige")) return "😌 Sa rive tout moun. Ki sa k ap fatige w konsa ?";
    if (t.includes("rate")) return "💙 Rater fè pati chemen an. Sa w ta renmen amelyore ?";
    return "👂 Mwen la, pale avè m. Pran tan w.";
  }

  if (t.includes("ça va")) return "😊 Tant mieux. Qu’est-ce qui te fait te sentir comme ça ?";
  if (t.includes("fatigu")) return "😌 La fatigue peut peser. C’est plutôt physique ou mental ?";
  if (t.includes("rat")) return "💙 Rater fait partie du chemin. Tu veux t’améliorer sur quoi ?";
  return "👂 Je t’écoute. Prends ton temps.";
}
