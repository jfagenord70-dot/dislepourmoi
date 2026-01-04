document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("messageInput");
  const chat = document.getElementById("chat");

  const btnFr = document.getElementById("btn-fr");
  const btnKr = document.getElementById("btn-kr");

  let currentLang = "fr";

  // Message d’accueil
  chat.innerHTML += `
    <p><strong>Bot :</strong> 👋 Salut ! Choisis une langue et parle-moi librement.</p>
  `;

  // Gestion langue
  btnFr.addEventListener("click", () => {
    currentLang = "fr";
    btnFr.classList.add("active");
    btnKr.classList.remove("active");
  });

  btnKr.addEventListener("click", () => {
    currentLang = "kreyol";
    btnKr.classList.add("active");
    btnFr.classList.remove("active");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    chat.innerHTML += `<p><strong>Toi :</strong> ${text}</p>`;
    input.value = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          lang: currentLang
        })
      });

      const data = await res.json();
      chat.innerHTML += `<p><strong>Bot :</strong> ${data.reply}</p>`;
    } catch {
      chat.innerHTML += `<p style="color:red">Erreur serveur</p>`;
    }

    chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
  });
});
