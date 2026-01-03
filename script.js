console.log("SCRIPT CHARGÉ");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM OK");

  const button = document.getElementById("sendBtn");
  const input = document.getElementById("messageInput");
  const chat = document.getElementById("chat");

  if (!button || !input || !chat) {
    console.error("ÉLÉMENT MANQUANT");
    return;
  }

  button.addEventListener("click", sendMessage);

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    chat.innerHTML += `<p><strong>Toi :</strong> ${text}</p>`;
    input.value = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      chat.innerHTML += `<p><strong>Bot :</strong> ${data.reply}</p>`;
    } catch (err) {
      chat.innerHTML += `<p style="color:red">Erreur serveur</p>`;
      console.error(err);
    }
  }
});
