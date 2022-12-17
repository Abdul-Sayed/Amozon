import { useState, useEffect } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../state/slices/cartSlice";

const Product = ({ id, title, price, category, description, image }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [rating] = useState(Math.floor(Math.random() * 5 - 1 + 1 + 1));
  const [hasPrime] = useState(Math.random() > 0.5 ? true : false);
  const dispatch = useDispatch();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  function saveToCart() {
    dispatch(
      addToCart({
        id,
        title,
        price,
        category,
        description,
        image,
        rating,
        hasPrime,
      })
    );
  }

  return (
    <li className="relative flex flex-col m-5 bg-white p-10 z-30 h-full">
      <p className="absolute top-2 right-2 text-sm italic text-gray-400">
        {category}
      </p>

      <Image
        src={image}
        alt="Product Image"
        width={200}
        height={200}
        className="h-48 w-auto self-center object-contain"
      />

      <h4 className="my-3">{title}</h4>

      {hasMounted && (
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
      )}

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <Currency quantity={price} />

      {hasMounted && hasPrime && (
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

      <button className="mt-auto button" onClick={() => saveToCart()}>
        Add to Cart
      </button>
    </li>
  );
};

export default Product;
