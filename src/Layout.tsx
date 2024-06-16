import { Link, NavLink } from "react-router-dom";
import SearchIcon from "./components/icons/search";
import { Toaster } from "sonner";
import Logo from "./components/icons/Logo";
import Search from "./components/ui/Search";
import React from "react";

export const API_URL = import.meta.env.VITE_ENDPOINT_BACKEND;

export function Layout(props: { children: React.ReactNode }) { 
  return (
    <>
      <header id="header" className="bg-gradient-to-b relative from-0% from-[#fc7c4ab8] to-100% to-[#f7f7f7] h-56">
        <nav className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center pt-7 justify-between mx-auto p-4 gap-10">
          <Link
            to="/home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Logo />
            <span className="self-center text-4xl font-black font-onest whitespace-nowrap">
              RecipeBook
            </span>
          </Link>
          <div className="flex md:order-1 md:w-full">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1"
            >
              <SearchIcon />
              <span className="sr-only">Search</span>
            </button>

            {/* SEARCH FORM COMPONENT FOR DESKTOP */}
            <Search />

            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            {/* SEARCH FORM COMPONENT FOR MOBILE */}
            <Search mobile />

            <ul className="flex p-4 flex-col items-center md:bg-transparent bg-[#f7f7f7] md:items-start gap-5 md:gap-0 md:p-0 mt-4 font-medium border rounded-lg md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <div className="flex gap-6 md:gap-2.5 md:mr-3">
                <li>
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : ""
                    }
                  >
                    <div className="flex flex-col justify-center items-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-home"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                      </svg>
                      <span className="block md:hidden">Home</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-red-500" : ""
                    }
                    data-popover-target="popover-default"
                    to="/search"
                  >
                    <div className="flex flex-col justify-center items-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                      <span className="block md:hidden">Search</span>
                    </div>
                  </NavLink>
                  <div
                    data-popover
                    id="popover-default"
                    role="tooltip"
                    className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0"
                  >
                    <div className="px-3 py-2">
                      <p>Advanced research</p>
                    </div>
                    <div data-popper-arrow />
                  </div>
                </li>
              </div>

              <li className="hover:scale-105 transition-all">
                <NavLink
                  to="/add-recipe"
                  className="px-5 lg:px-8 py-2 rounded-full bg-red-500 text-white active:bg-red-800 text-nowrap"
                >
                  Add Recipe
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="min-h-dvh h-auto bg-[#f7f7f7] grid items-center justify-center">{props.children}</main>

      <footer className="bg-white rounded-lg shadow dark:bg-gray-200 relative bottom-0 w-full">
        <div className="w-full max-w-screen-xl mx-auto md:flex p-4 md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023
            <Link to="/" className="hover:underline">
              Welcome
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
      <Toaster richColors position="bottom-center" />
    </>
  );
}
