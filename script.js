async function send() {
  const input = document.getElementById("msg");
  const message = input.value;

  if (!message) return;

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();

  const div = document.getElementById("messages");
  div.innerHTML += `<p><strong>Toi:</strong> ${message}</p>`;
  div.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;

  input.value = "";
}





