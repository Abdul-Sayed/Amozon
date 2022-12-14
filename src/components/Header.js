import Image from "next/image";
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header>
      <nav className="flex flex-grow items-center bg-amazon_blue p-1 py-2">
        <section className="flex flex-grow sm:flex-grow-0 items-center m-2 mr-4">
          <Image
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
            width={150}
            height={40}
            style={{ objectFit: "contain" }}
            className="cursor-pointer"
          />
        </section>

        <section className="hidden sm:flex flex-grow items-center rounded-md bg-yellow-400 hover:bg-yellow-500 mb-2 h-11 cursor-pointer">
          <input
            type="text"
            className="h-full p-4 flex-grow flex-shrink rounded-sm rounded-l-md outline-none"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </section>

        <section className="flex items-center font-arial text-white text-xs mx-5 space-x-5 whitespace-nowrap mb-2">
          <div className="link">
            <p>Hello User</p>
            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div className="flex items-center relative link">
            <ShoppingCartIcon className="h-10" />
            <span className="absolute top-0 right-0 md:right-8 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold">
              0
            </span>
            <p className="hidden md:inline-flex md:text-sm font-extrabold mt-2">
              Cart
            </p>
          </div>
        </section>
      </nav>

      <nav className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light font-arial text-white text-sm">
        <Bars3Icon className="h-6 mr-1" />
        <p className="link">All</p>
        <p className="link">Prime</p>
        <p className="link">Today's Deals</p>
        <p className="link">Buy Again</p>
        <p className="link hidden lg:inline-flex">Prime Video</p>
        <p className="link hidden lg:inline-flex">Amazon Business</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Health and Personal Care</p>
        <p className="link hidden lg:inline-flex">Food and Grocery</p>
        <p className="link hidden lg:inline-flex">Pharmacy</p>
        <p className="link hidden lg:inline-flex">Pet Supplies</p>
      </nav>
    </header>
  );
};

export default Header;