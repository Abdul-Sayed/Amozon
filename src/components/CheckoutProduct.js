import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../state/slices/cartSlice";

const CheckoutProduct = ({
  id,
  title,
  price,
  category,
  description,
  image,
  quantity,
  rating,
  hasPrime,
}) => {
  const dispatch = useDispatch();

  function deleteFromCart() {
    dispatch(removeFromCart(id));
  }

  return (
    <li className="grid grid-cols-5 m-4 bg-white h-full">
      <Image
        src={image}
        alt="Product Image"
        width={200}
        height={200}
        className="h-48 self-center object-contain"
      />

      <div className="col-span-3 mx-5">
        {title.includes("http") ? (
          <a
            href={title}
            alt="Amazon Link"
            target="_blank"
            className="my-3 text-blue-700"
          >
            {title}
          </a>
        ) : (
          <h4 className="my-3">{title}</h4>
        )}

        {quantity > 1 && <h4 className="my-3">({quantity})</h4>}

        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>

        <Currency quantity={price} />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://whitebox.com/wp-content/uploads/2020/05/Prime-tag-.png"
              alt="Prime Logo"
              loading="lazy"
              className="w-12 h-auto"
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>

      <button
        className="mt-auto button justify-self-end my-auto"
        onClick={() => deleteFromCart()}
      >
        Remove From Cart
      </button>
    </li>
  );
};

export default CheckoutProduct;
