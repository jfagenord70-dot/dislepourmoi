alert("SCRIPT JS CHARGÉ");

const input = document.getElementById("message");
const button = document.getElementById("send");
const chatBox = document.getElementById("chat");

button.addEventListener("click", async (e) => {
  e.preventDefault(); // 🔥 BLOQUE le reload

  const text = input.value.trim();
  if (!text) return;

  chatBox.innerHTML += `<div><b>Toi :</b> ${text}</div>`;
  input.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    chatBox.innerHTML += `<div><b>Bot :</b> ${data.reply}</div>`;
  } catch (err) {
    chatBox.innerHTML += `<div>❌ Erreur serveur</div>`;
  }
});







