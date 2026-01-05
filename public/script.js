console.log("SCRIPT CHARGÉ ✅");

const chat = document.getElementById("chat");
const input = document.getElementById("message");
const form = document.getElementById("chat-form");
const resetBtn = document.getElementById("reset");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value) return;
  chat.innerHTML += `<p>Toi : ${input.value}</p>`;
  input.value = "";
});

resetBtn.onclick = () => {
  chat.innerHTML = "";
};
