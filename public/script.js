const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message");
const chatDiv = document.getElementById("chat");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chatDiv.appendChild(msg);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = messageInput.value.trim();
  if (!text) return;

  // Message utilisateur
  addMessage(text, "user");
  messageInput.value = "";

  try {
    const res = await fetch(
      "https://dislepourmoi-backend.onrender.com/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      }
    );

    const data = await res.json();

    // Réponse IA
    addMessage(data.reply, "bot");
  } catch (err) {
    addMessage("❌ Erreur serveur. Réessaie.", "bot");
    console.error(err);
  }
});
