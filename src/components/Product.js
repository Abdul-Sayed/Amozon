import { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";

const Product = ({ title, price, category, description, image }) => {
  const [rating] = useState(Math.floor(Math.random() * 5 - 1 + 1 + 1));
  const [hasPrime] = useState(Math.random() > 0.5 ? true : false);
  return (
    <div className="relative flex flex-col m-5 bg-white p-10 z-30 h-full">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        alt="Product Image"
        width={200}
        height={200}
        style={{ objectFit: "contain" }}
        className="h-48 self-center"
      />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {[...Array(rating).keys()].map((_, i) => (
          <StarIcon key={i} className="h-5 text-yellow-500" />
        ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <Currency quantity={price} />
      {hasPrime && (
        <div className="flex items-center space-x-2">
          <img
            src="https://whitebox.com/wp-content/uploads/2020/05/Prime-tag-.png"
            alt="Prime Logo"
            className="w-12"
          />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}
      <button className="mt-auto button">Add to Cart</button>
    </div>
  );
};

export default Product;
