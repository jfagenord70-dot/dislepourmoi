const input = document.getElementById("message");
const button = document.getElementById("send");
const chatBox = document.getElementById("chat");

// 🔥 Sécurité : vérifier que les éléments existent
if (!input || !button || !chatBox) {
  console.error("Éléments HTML manquants ❌");
}

// ➕ Ajouter un message dans le chat
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender === "user" ? "user-msg" : "bot-msg";
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 🧠 CLICK SUR ENVOYER
button.addEventListener("click", async () => {
  const text = input.value.trim();

  if (text === "") return;

  // Message utilisateur
  addMessage("Toi : " + text, "user");
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();

    addMessage("Bot : " + data.reply, "bot");
  } catch (err) {
    console.error(err);
    addMessage("Bot : Erreur serveur ❌", "bot");
  }
});

// ⌨️ ENTRÉE CLAVIER (Enter)
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});






