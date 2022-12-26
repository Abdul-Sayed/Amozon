import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure a connection to Firebase from backend
const servicAccount = require("../../../permissions.json");
const app = !admin.apps.length
  ? admin.initializeApp({ credential: admin.credential.cert(servicAccount) })
  : admin.app();

const fullfillOrder = async (session) => {
  console.log("Fulfilling order. Session:", session);
  // Persist the completed order to Firestore
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total,
      name: session.customer_details.name,
      email: session.customer_details.email,
      phone: session.customer_details.phone,
      billing_address: session.billing_details.address,
      shipping_address: session.customer_details.address,
      shipping_cost: session.shipping_cost.amount_total,
      amount: session.amount / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      payment_status: session.payment_status,
    })
    .then(() => {
      console.log(`Success: Order ${session.id} has been added to the DB`);
    });
};

// Establish connection to Stripe
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
    event.type === "checkout.session.completed" && console.log("event:", event);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const data = {
  id: "cs_test_a142ocy0CefiV4M89te96N1bZy8cegmVZ7nOaWXkcKnjFl6CQGgXEL3ta8",
  object: "checkout.session",
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 2995,
  amount_total: 2995,
  automatic_tax: {
    enabled: false,
    status: null,
  },
  billing_address_collection: null,
  cancel_url: "http://localhost:3000/cancel",
  client_reference_id: null,
  consent: null,
  consent_collection: null,
  created: 1672007803,
  currency: "usd",
  custom_text: {
    shipping_address: null,
    submit: null,
  },
  customer: null,
  customer_creation: "if_required",
  customer_details: {
    address: {
      city: "Corona",
      country: "US",
      line1: "Lincoln Avenue",
      line2: null,
      postal_code: "92882",
      state: "CA",
    },
    email: "ss@gg.com",
    name: "Abe Nilcon",
    phone: null,
    tax_exempt: "none",
    tax_ids: [],
  },
  customer_email: null,
  expires_at: 1672094203,
  invoice: null,
  invoice_creation: {
    enabled: false,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      metadata: {},
      rendering_options: null,
    },
  },
  livemode: false,
  locale: null,
  metadata: {
    amount_total: "29.95",
    email: "awsayed@alaska.edu",
    images: '["https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"]',
    name: "Abdul Sayed",
  },
  mode: "payment",
  payment_intent: "pi_3MJ2okH9TJsbQaQK0puQAXfX",
  payment_link: null,
  payment_method_collection: "always",
  payment_method_options: {},
  payment_method_types: ["card"],
  payment_status: "paid",
  phone_number_collection: {
    enabled: false,
  },
  recovered_from: null,
  setup_intent: null,
  shipping_address_collection: {
    allowed_countries: ["US", "CA"],
  },
  shipping_cost: {
    amount_subtotal: 0,
    amount_tax: 0,
    amount_total: 0,
    shipping_rate: "shr_1MJ2oBH9TJsbQaQKcTG00k3W",
  },
  shipping_details: {
    address: {
      city: "Corona",
      country: "US",
      line1: "Lincoln Avenue",
      line2: null,
      postal_code: "92882",
      state: "CA",
    },
    name: "Abe Nilcon",
  },
  shipping_options: [
    {
      shipping_amount: 0,
      shipping_rate: "shr_1MJ2oBH9TJsbQaQKcTG00k3W",
    },
  ],
  status: "complete",
  submit_type: null,
  subscription: null,
  success_url: "http://localhost:3000/success",
  total_details: {
    amount_discount: 0,
    amount_shipping: 0,
    amount_tax: 0,
  },
  url: null,
};
