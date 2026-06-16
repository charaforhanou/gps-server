const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Dernière position reçue
let lastPosition = {
  lat: 0, lng: 0, alt: 0,
  speed: 0, satellites: 0,
  fix: false, timestamp: null
};

// ESP32 envoie ici
app.post('/update', (req, res) => {
  const { lat, lng, alt, speed, satellites, fix } = req.body;
  lastPosition = {
    lat, lng, alt, speed, satellites, fix,
    timestamp: new Date().toISOString()
  };
  console.log(`GPS: ${lat}, ${lng} | sats: ${satellites}`);
  res.json({ ok: true });
});

// Dashboard récupère ici
app.get('/position', (req, res) => {
  res.json(lastPosition);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Serveur GPS sur port ${PORT}`));