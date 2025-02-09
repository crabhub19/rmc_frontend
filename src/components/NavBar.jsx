import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image/built-in/logo.png";
import {
  BaggageClaim,
  Heart,
  UserRound,
  Menu,
  Search,
  UserRoundPlus,
  LogIn,
} from "lucide-react";
export default function NavBar() {
  const pathLocation = useLocation().pathname;
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const searchMenu = {
    name: "search",
  };
  const searchButton = {
    name: "searchButton",
  };
  const navigation = [
    { name: "Home", to: "/", current: pathLocation === "/" ? true : false },
    {
      name: "Catalog",
      to: "/catalog",
      current: pathLocation === "/catalog" ? true : false,
    },
    {
      name: "About",
      to: "/about",
      current: pathLocation === "/about" ? true : false,
    },
    {
      name: "Contact",
      to: "/contact",
      current: pathLocation === "/contact" ? true : false,
    },
  ];
  const authNavigation = localStorage.getItem("access_token")
    ? [
        {
          name: "Wishlist",
          to: "/wishlist",
          icon: <Heart />,
          current: pathLocation === "/wishlist" ? true : false,
        },
        {
          name: "Cart",
          to: "/cart",
          icon: <BaggageClaim />,
          current: pathLocation === "/cart" ? true : false,
        },
        {
          name: "Account",
          to: "/account",
          icon: <UserRound />,
          current: pathLocation === "/account" ? true : false,
        },
      ]
    : [
        {
          name: "Login",
          to: "/auth",
          icon: <LogIn />,
          current: pathLocation === "/auth" ? true : false,
        },
        {
          name: "Signup",
          to: "/signup",
          icon: <UserRoundPlus />,
          current: pathLocation === "/signup" ? true : false,
        },
      ];
  return (
    <>
      <header className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
        <Link to="/">
          <img
            className="cursor-pointer sm:h-auto w-28"
            src={logo}
            alt="company logo"
          />
        </Link>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu />
          </button>
        </div>

        <form className="hidden h-9 w-2/5 items-center border md:flex pl-2">
          <Search />
          <input
            {...searchMenu}
            className="hidden w-11/12 outline-none md:block px-2"
            type="search"
            placeholder="Search"
          />

          <button
            {...searchButton}
            className="ml-auto h-full bg-theme text-white px-4 hover:bg-theme-dark text-white-dark "
          >
            Search
          </button>
        </form>

        <div className="hidden gap-3 md:!flex">
          {authNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="flex cursor-pointer flex-col items-center justify-center hover:scale-110 transition duration-300 ease-out"
            >
              {item.icon}
              <p className="text-xs">{item.name}</p>
            </Link>
          ))}
        </div>
      </header>

      {/* mobile menu */}
      <section
        className={`absolute left-0 right-0 z-50 h-screen w-full bg-white md:hidden ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="mx-auto">
          <div className="mx-auto flex w-full justify-center gap-3 py-4">
            {authNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="flex cursor-pointer flex-col items-center justify-center hover:scale-110 transition duration-300 ease-out"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <p className="text-xs">{item.name}</p>
              </Link>
            ))}
          </div>

          <form className="my-4 mx-5 flex h-9 items-center border pl-2">
            <Search />

            <input
              {...searchMenu}
              className=" w-11/12 outline-none md:hidden px-2"
              type="search"
              placeholder="Search"
            />
            <button
              {...searchButton}
              type="submit"
              className="ml-auto h-full bg-theme text-white px-4 hover:bg-theme-dark text-white-dark "
            >
              Search
            </button>
          </form>
          {navigation.map((item) => (
            <Link
              onClick={() => setMobileMenuOpen(false)}
              key={item.name}
              to={item.to}
              className={`${
                item.current ? "bg-theme text-white " : "text-black"
              } flex cursor-pointer flex-col items-center justify-center py-2 hover:bg-theme hover:text-white`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      {/* desktop menu */}
      <nav className="relative bg-theme shadow">
        <div className="mx-auto hidden h-12 w-full max-w-[1200px] items-center md:flex">
          <button
            onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
            className="ml-5 flex h-full w-40 cursor-pointer items-center justify-center bg-primary hover:bg-primary-light text-theme"
          >
            <div className="flex justify-around" href="#">
              <Menu />
              All categories
            </div>
          </button>

          <div className="mx-7 flex gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`${
                  item.current ? "underline " : ""
                } flex cursor-pointer flex-col items-center justify-center py-2 hover:underline text-white`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* all catagory */}
      <section
        className={`absolute hidden left-0 right-0 z-10 w-full border-b border-r border-l bg-white ${
          categoryMenuOpen ? "md:block" : "hidden"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] py-10">
          <div className="w-[300px] border-r">
            <ul className="px-5">
              <li className="active:blue-900 flex items-center gap-2 bg-theme text-white py-2 px-3 active:bg-theme ">
                <img
                  width="15px"
                  height="15px"
                  src="./assets/images/bed.svg"
                  alt="Bedroom icon"
                />
                Bedroom
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-theme text-white">
                <img
                  width="15px"
                  height="15px"
                  src="./assets/images/sleep.svg"
                  alt="bedroom icon"
                />
                Matrass
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-theme text-white">
                <img
                  width="15px"
                  height="15px"
                  src="./assets/images/outdoor.svg"
                  alt="bedroom icon"
                />
                Outdoor
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-theme text-white">
                <img
                  width="15px"
                  height="15px"
                  src="./assets/images/sofa.svg"
                  alt="bedroom icon"
                />
                Sofa
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-theme text-white">
                <img
                  width="15px"
                  height="15px"
                  src="./assets/images/kitchen.svg"
                  alt="bedroom icon"
                />
                Kitchen
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>

              <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-theme text-white">
                <img
                  width="15px"
                  height="15px"
                  src="./assets/images/food.svg"
                  alt="Food icon"
                />
                Living room
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex gap-6">
              <div className="mx-5">
                <p className="font-medium text-gray-500">BEDS</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Italian bed</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Queen-size bed</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Wooden craft bed</a>
                  </li>
                  <li>
                    <a href="product-overview.html">King-size bed</a>
                  </li>
                </ul>
              </div>

              <div className="mx-5">
                <p className="font-medium text-gray-500">LAMPS</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Italian Purple Lamp</a>
                  </li>
                  <li>
                    <a href="product-overview.html">APEX Lamp</a>
                  </li>
                  <li>
                    <a href="product-overview.html">PIXAR lamp</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Ambient Nightlamp</a>
                  </li>
                </ul>
              </div>

              <div className="mx-5">
                <p className="font-medium text-gray-500">BEDSIDE TABLES</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Purple Table</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Easy Bedside</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Soft Table</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Craft Table</a>
                  </li>
                </ul>
              </div>

              <div className="mx-5">
                <p className="font-medium text-gray-500">SPECIAL</p>
                <ul className="text-sm leading-8">
                  <li>
                    <a href="product-overview.html">Humidifier</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Bed Cleaner</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Vacuum Cleaner</a>
                  </li>
                  <li>
                    <a href="product-overview.html">Pillow</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
