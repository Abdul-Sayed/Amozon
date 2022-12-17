import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Product from "./Product";
const ProductFeed = ({ products }) => {
  return (
    <ul className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-24 mx-auto gap-2">
      {products
        .slice(0, 4)
        .map(({ id, title, price, category, description, image }) => (
          <Product
            key={uuidv4()}
            id={id}
            title={title}
            price={price}
            category={category}
            description={description}
            image={image}
          />
        ))}
      <Image
        src={`https://i.pcmag.com/imagery/articles/07sENLKoowkVRwbpLcDGrxv-34..v1656612707.jpg`}
        alt="Product Image"
        width={1496}
        height={299}
        style={{ objectFit: "contain" }}
        className="md:col-span-full w-screen object-cover object-center h-72 mt-6"
      />
      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, category, description, image }) => (
            <Product
              key={uuidv4()}
              id={id}
              title={title}
              price={price}
              category={category}
              description={description}
              image={image}
            />
          ))}
      </div>
      {products
        .slice(5)
        .map(({ id, title, price, category, description, image }) => (
          <Product
            key={uuidv4()}
            id={id}
            title={title}
            price={price}
            category={category}
            description={description}
            image={image}
          />
        ))}
    </ul>
  );
};

export default ProductFeed;
