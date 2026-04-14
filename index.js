const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/create-intent', async (req, res) => {
  try {
    const response = await fetch("https://api.duffel.com/payments/payment_intents", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DUFFEL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "Duffel-Version": "v2"
      },
      body: JSON.stringify({
        data: { 
          amount: "150.00", 
          currency: "EUR" 
        }
      })
    });
    const result = await response.json();
    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: "Error al conectar con Duffel" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Iberomundo funcionando`));