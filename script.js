const input = document.querySelector("input");
const button = document.querySelector("button");
const messages = document.querySelector(".messages");

button.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  // Message utilisateur
  const userMsg = document.createElement("div");
  userMsg.className = "user";
  userMsg.textContent = message;
  messages.appendChild(userMsg);

  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    // Réponse serveur
    const botMsg = document.createElement("div");
    botMsg.className = "bot";
    botMsg.textContent = data.reply;
    messages.appendChild(botMsg);

  } catch (err) {
    alert("Erreur serveur");
    console.error(err);
  }
});




