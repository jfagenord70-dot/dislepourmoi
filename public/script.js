const form = document.getElementById("form");
const input = document.getElementById("message");
const chat = document.getElementById("chat");
const resetBtn = document.getElementById("reset");

// 👉 URL backend (Render en prod, localhost en dev)
const API_URL =
  window.location.hostname.includes("localhost")
    ? "http://localhost:10000"
    : "https://dislepourmoi-backend.onrender.com";

function addMessage(author, text) {
  const p = document.createElement("p");
  p.innerHTML = `<b>${author} :</b> ${text}`;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addMessage("Toi", text);
  input.value = "";

  try {
    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
