// ====== RÉFÉRENCES ======
const form = document.getElementById("form");
const input = document.getElementById("message");
const responseBox = document.getElementById("response");

// ⚠️ METS URL BACKEND LA ICI (ABSOLUE)
const API_URL = "https://TON-BACKEND.onrender.com/api/chat";

// ====== SUBMIT FORM ======
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userMessage = input.value.trim();

  if (!userMessage) {
    alert("Antre yon mesaj dabò");
    return;
  }

  // Affiche message utilisateur
  responseBox.innerHTML = "⏳ Ap voye mesaj la...";
  input.value = "";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    if (!res.ok) {
      throw new Error("Erreur serveur");
    }

    const
