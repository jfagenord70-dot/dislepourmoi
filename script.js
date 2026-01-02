document.getElementById("sendBtn").addEventListener("click", async () => {
  const input = document.getElementById("messageInput");
  const responseBox = document.getElementById("response");

  const message = input.value;
  if (!message) return;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    responseBox.innerText = data.reply;
  } catch (err) {
    responseBox.innerText = "Erreur serveur";
  }
});




