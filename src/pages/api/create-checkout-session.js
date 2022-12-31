import moment from "moment";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, total, user, numItems } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          description: item.description.slice(0, 150) + "...",
          images: [item.image],
        },
      },
      quantity: item.quantity,
    })),
    customer_email: user.email,
    mode: "payment",
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/cancel`,
    metadata: {
      name: user.name,
      email: user.email,
      images: JSON.stringify(items.map((item) => item.image)),
      amount_total: total,
      timestamp: moment().format("lll"),
      numItems: numItems,
    },
  });

  res.status(200).json({ id: session.id });
};
