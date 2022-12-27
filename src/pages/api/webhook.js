import { buffer } from "micro";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    // Verify that the Event posted came from Stripe
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("Error:", error.message);
      return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle the Stripe checkout session completion event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const stripeData = await stripe.checkout.sessions.list({ limit: 100 });
      return stripeData;
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
