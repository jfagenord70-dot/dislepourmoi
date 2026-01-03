document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("messageInput");
  const chat = document.getElementById("chat");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // 🔒 empêche le reload

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
    }

    chat.scrollTop = chat.scrollHeight;
  });
});
