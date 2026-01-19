const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message");
const chatDiv = document.getElementById("chat");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.textContent = `${sender === "user" ? "Toi" : "IA"} : ${text}`;
  chatDiv.appendChild(div);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = messageInput.value.trim();
  if (!text) return;

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
    addMessage(data.reply, "ai");
  } catch (err) {
    console.error(err);
    addMessage("❌ Erreur serveur", "ai");
  }
});
