const express = require('express');
const Stripe = require('stripe');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27' // Replace with your desired Stripe API version
});

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'PRICE_ID_HERE', // Replace with your Price ID
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://yourwebsite.com/success', // Replace with your success URL
      cancel_url: 'https://yourwebsite.com/cancel', // Replace with your cancel URL
    });

    res.status(200).json({ sessionId: session.id });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

