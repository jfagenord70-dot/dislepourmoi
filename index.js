import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// routes
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/chat", (req, res) => {
  const { message } = req.body;

  res.json({
    reply: "Salut ! Comment puis-je t’aider ?"
  });
});

// start server
app.listen(PORT, () => {
  console.log("EXPRESS SERVER STARTED on port", PORT);
});
