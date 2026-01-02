const input = document.getElementById("messageInput");
const button = document.getElementById("sendBtn");

button.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    alert(data.reply);
    input.value = "";
  } catch (err) {
    console.error(err);
    alert("Erreur serveur");
  }
});




