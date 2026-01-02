const input = document.querySelector("input");
const button = document.querySelector("button");

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
    alert(data.reply); // ou affiche-le dans la page
    input.value = "";
  } catch (err) {
    alert("Erreur serveur");
    console.error(err);
  }
});



