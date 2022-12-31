import { getSession, useSession } from "next-auth/react";
import Header from "./../components/Header";
import Order from "./../components/Order";

const Orders = ({ orders }) => {
  const { data, status } = useSession({ required: true });

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

        {status === "authenticated" && (
          <div className="mt-5 space-y-4">
            {orders?.map(({ id, amount_total, shipping_cost, metadata }) => (
              <Order
                key={id}
                id={id}
                amount={amount_total}
                amountShipping={shipping_cost?.amount_total}
                numItems={metadata.numItems}
                timestamp={metadata.timestamp}
                images={metadata.images}
              />
            ))}
          </div>
        )}
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

  // Orders from Stripe
  const stripeData = await stripe.checkout.sessions.list({ limit: 100 });
  let allOrders = JSON.parse(JSON.stringify(stripeData)).data;
  let orders = allOrders.filter(
    (order) => order.customer_email === session.user.email
  );
  return {
    props: {
      orders,
    },
  };
}
