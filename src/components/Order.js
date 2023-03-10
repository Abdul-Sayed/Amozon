import Currency from "react-currency-formatter";
import { v4 as uuidv4 } from "uuid";

const Order = ({ id, amount, amountShipping, numItems, timestamp, images }) => {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">Order Placed</p>
          <p>{timestamp}</p>
        </div>
        <div>
          <p className="font-bold text-xs">TOTAL</p>
          <p>
            <Currency quantity={amount / 100} />- Delivery{" "}
            <Currency quantity={amountShipping ? amountShipping : 0} />
          </p>
        </div>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {numItems}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images &&
            JSON.parse(images).map((image) => (
              <img
                key={uuidv4()}
                src={image}
                alt="product image"
                className="h-20 sm:h-32 object-contain"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
