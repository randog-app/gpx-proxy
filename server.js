import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors()); // autorise les requêtes venant du navigateur

// Route principale
app.get("/fetch", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Erreur : URL manquante");
  }

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) {
      return res.status(response.status).send("Erreur HTTP: " + response.status);
    }

    const contentType = response.headers.get("content-type");
    res.set("Content-Type", contentType);
    const data = await response.text();
    res.send(data);
  } catch (err) {
    console.error("Erreur proxy:", err);
    res.status(500).send("Erreur serveur proxy");
  }
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Proxy GPX actif sur le port ${PORT}`));
