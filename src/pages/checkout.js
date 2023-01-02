import Image from "next/image";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Currency from "react-currency-formatter";
import { useSession, signIn } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import {
  itemsTotal,
  quantityItems,
  cartItems,
} from "../state/slices/cartSlice";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(cartItems);
  const total = useSelector(itemsTotal);
  const numItems = useSelector(quantityItems);
  const { data, status } = useSession();

  async function createCheckoutSession() {
    const stripe = await stripePromise;
    // call  backend to create a checkout Session
    const checkoutSession = await axios.post("./api/create-checkout-session", {
      items,
      total,
      user: data.user,
      numItems,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  }

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="flex flex-col lg:flex-row h-full max-w-screen-2xl mx-auto">
        <div className="flex-grow mb-5 ml-0 mr-2 shadow-md">
          <Image
            src="https://fortheloveblog.com/wp-content/uploads/2016/07/Amazon-Prime-Banner.jpg"
            alt="Amazon Prime Banner"
            width={2560}
            height={834}
            className={"h-80 object-cover object-top"}
          />
          <ul className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your cart is empty" : "Your Cart"}
            </h1>
            {items.map(
              ({
                id,
                title,
                price,
                category,
                description,
                image,
                quantity,
                rating,
                hasPrime,
              }) => (
                <CheckoutProduct
                  key={uuidv4()}
                  id={id}
                  title={title}
                  price={price}
                  category={category}
                  description={description}
                  image={image}
                  quantity={quantity}
                  rating={rating}
                  hasPrime={hasPrime}
                />
              )
            )}
          </ul>
        </div>

        {items.length > 0 && (
          <div className="flex flex-col bg-white mb-5 mr-0 ml-2 p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal{" "}
              {numItems === 1 ? `${numItems} item` : `${numItems} items`}:
              <span className="ml-1 font-bold">
                <Currency quantity={total} />
              </span>
            </h2>
            {status === "authenticated" ? (
              <button
                role="link"
                className="button mt-2"
                onClick={createCheckoutSession}
              >
                Checkout
              </button>
            ) : (
              <button role="link" className="button mt-2" onClick={signIn}>
                Sign in to checkout
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
