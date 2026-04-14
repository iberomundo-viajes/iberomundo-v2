 const express = require('express');
const Stripe = require('stripe');
const path = require('path');
const app = express();

// Configuramos Stripe con tu llave secreta de Render
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(express.static('public'));

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { flightPrice, flightName } = req.body;

    // AQUÍ ESTÁ TU GANANCIA: Precio de Duffel + 80 euros
    const totalConComision = (parseFloat(flightPrice) + 80) * 100; // Multiplicamos por 100 porque Stripe usa céntimos

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/cancel.html`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error en Stripe:", error);
    res.status(500).json({ error: "No se pudo crear la sesión de pago" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Iberomundo con Stripe funcionando`));
