const input = document.getElementById("messageInput");
const button = document.getElementById("sendBtn");
const responseEl = document.getElementById("response");

let isSending = false;

async function sendMessage() {
  if (isSending) return;

  const message = input.value.trim();
  if (!message) return;

  isSending = true;
  button.disabled = true;
  button.textContent = "Envoi...";
  responseEl.textContent = "";

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) {
      responseEl.textContent = "Erreur serveur.";
      return;
    }

    const data = await res.json();
    responseEl.textContent = data.reply;
    input.value = "";
  } catch (err) {
    responseEl.textContent = "Connexion impossible.";
  } finally {
    isSending = false;
    button.disabled = false;
    button.textContent = "Envoyer";
  }
}

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});





