import { getSession, useSession } from "next-auth/react";
import moment from "moment";
import Header from "./../components/Header";
import db from "../../firebase";
import Order from "./../components/Order";

const Orders = ({ stripeData }) => {
  const { status } = useSession();
  let orders = JSON.parse(JSON.stringify(stripeData)).data;

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {status === "authenticated" ? (
          <h2>
            {orders.length} {orders.length > 1 ? "Orders" : "Order"}
          </h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders?.map(({ id, amount_total, shipping_cost, metadata }) => (
            <Order
              key={id}
              id={id}
              amount={amount_total}
              amountShipping={shipping_cost?.amount_total}
              items={metadata.numItems}
              timestamp={metadata.timestamp}
              images={metadata.images}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // Orders from Firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // Orders from Stripe
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: await stripe.checkout.sessions.listLineItems(order.id, {
        limit: 100,
      }),
    }))
  );

  const stripeData = await stripe.checkout.sessions.list({ limit: 100 });

  return {
    props: {
      stripeData,
    },
  };
}
