import Head from "next/head";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import Header from "./../components/Header";

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Amozon</title>
      </Head>
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

export async function getStaticProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: { products },
  };
}
