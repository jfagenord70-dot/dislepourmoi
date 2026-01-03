const input = document.querySelector("input");
const button = document.querySelector("button");
const chat = document.querySelector(".chat");

button.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  chat.innerHTML += `<p><strong>Toi :</strong> ${message}</p>`;
  input.value = "";

  fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
    .then(res => res.json())
    .then(data => {
      chat.innerHTML += `<p><strong>Bot :</strong> ${data.reply}</p>`;
      chat.scrollTop = chat.scrollHeight;
    })
    .catch(() => {
      chat.innerHTML += `<p><strong>Bot :</strong> ❌ Erreur serveur</p>`;
    });
}






