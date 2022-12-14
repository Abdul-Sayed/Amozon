import React from "react";
import Product from "./Product";
const ProductFeed = ({ products }) => {
  return (
    <section className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-40 mx-auto gap-4">
      {products
        .slice(0, 4)
        .map(({ id, title, price, category, description, image }) => (
          <Product
            key={id}
            title={title}
            price={price}
            category={category}
            description={description}
            image={image}
          />
        ))}
      <img
        src="https://i.pcmag.com/imagery/articles/07sENLKoowkVRwbpLcDGrxv-34..v1656612707.jpg"
        className="md:col-span-full w-screen object-cover object-center h-72 mt-6"
      />
      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, category, description, image }) => (
            <Product
              key={id}
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
            key={id}
            title={title}
            price={price}
            category={category}
            description={description}
            image={image}
          />
        ))}
    </section>
  );
};

export default ProductFeed;
