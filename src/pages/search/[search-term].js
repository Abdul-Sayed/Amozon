import Header from "../../components/Header";
import Banner from "../../components/Banner";
import ProductFeed from "../../components/ProductFeed";

export default function Search({ products }) {
  return (
    <>
      <div className="bg-gray-100">
        <Header />
        <main className="h-full max-w-screen-2xl mx-auto">
          <Banner />
          <ProductFeed products={products} />
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const term = context.query["search-term"];

  try {
    const url = "https://real-time-amazon-data.p.rapidapi.com/search";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.AMAZON_API_KEY,
        "X-RapidAPI-Host": process.env.AMAZON_API_KEY_HOST,
      },
    };

    const response = await fetch(
      `${url}?query=${term}&country=US&category_id=aps&page=1`,
      options
    );
    const searchResults = await response.json();

    const products = searchResults.data.products.map(
      ({
        asin,
        product_url,
        product_price,
        product_title,
        product_photo,
        product_star_rating,
      }) => {
        return {
          id: asin,
          title: product_url,
          price: Number(product_price.slice(1)),
          description: product_title,
          category: "",
          image: product_photo,
          rating: { rate: product_star_rating },
        };
      }
    );

    return {
      props: { products },
    };
  } catch (error) {
    return { notFound: true };
  }
}
