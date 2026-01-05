let currentLang = "kr";

const chat = document.getElementById("chat");
const input = document.getElementById("message");
const sendBtn = document.getElementById("send");
const resetBtn = document.getElementById("reset");

const btnKr = document.getElementById("btn-kr");
const btnFr = document.getElementById("btn-fr");

/* =========================
   🌍 LANGUE
========================= */
btnKr.onclick = () => switchLang("kr");
btnFr.onclick = () => switchLang("fr");

function switchLang(lang) {
  currentLang = lang;

  btnKr.classList.toggle("active", lang === "kr");
  btnFr.classList.toggle("active", lang === "fr");

  resetConversation();
}

/* =========================
   📤 ENVOI MESSAGE
========================= */
sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  // 🔁 RESET PAR TEXTE
  if (text.toLowerCase() === "reset") {
    input.value = "";
    resetConversation();
    return;
  }

  addUserMessage(text);
  input.value = "";

  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: text,
      lang: currentLang
    })
  })
    .then(res => res.json())
    .then(data => addBotMessage(data.reply))
    .catch(() =>
      addBotMessage(
        currentLang === "kr"
          ? "😔 Erè. Eseye ankò."
          : "😔 Erreur. Réessaie."
      )
    );
}

/* =========================
   🔄 RESET CONVERSATION
========================= */
resetBtn.onclick = resetConversation;

function resetConversation() {
  chat.innerHTML = "";
  addBotMessage(
    currentLang === "kr"
      ? "👋 Bonjou ! Pale avè m an kreyòl."
      : "👋 Salut ! Parle-moi en français."
  );
}

/* =========================
   💬 AFFICHAGE
========================= */
function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "message user";
  div.textContent = "Toi : " + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function addBotMessage(text) {
  const div = document.createElement("div");
  div.className = "message bot";
  div.textContent = "Bot : " + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* =========================
   🚀 INIT
========================= */
resetConversation();
