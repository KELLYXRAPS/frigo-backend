import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY; // 🔒 clé cachée

app.post("/api/recette", async (req, res) => {

  const { texte } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [{
          role: "user",
          content: `Donne une recette complète pour : ${texte}`
        }]
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (e) {
    res.status(500).json({ error: "Erreur serveur" });
  }

});

app.listen(3000, () => console.log("Server running"));
