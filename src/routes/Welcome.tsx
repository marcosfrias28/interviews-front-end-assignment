import { Link } from "react-router-dom";
import Logo from "../components/icons/Logo";
import useTitle from "../hooks/useTitle";

function WelcomePage() {
  // Setting the title of the page with simple custom hook
  useTitle("Welcome");

  return (
    <section className="relative min-h-dvh flex justify-center items-center">
      <div className="absolute inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#f6cb54_100%)]" />
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto gap-10 lg:py-16 lg:grid-cols-12 ">
        <div className="lg:mt-0 lg:col-span-7 lg:flex">
          <img src="eating-healthy.svg" alt="mockup" />
        </div>

        <div className="mr-auto place-self-center lg:col-span-5">
          <div className="flex items-start gap-4 flex-nowrap mb-4">
            <Logo />
            <h1 className="self-center text-4xl font-black whitespace-nowrap">
              RecipeBook
            </h1>
          </div>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Discover, create, and share delicious recipes from all over the
            world with RecipeBook. Your culinary journey starts here.
          </p>

          <Link
            to="/home"
            className="inline-flex px-8 py-2 rounded-full hover:scale-105 transition-all bg-red-500 text-white active:bg-red-800 items-center justify-center text-bas font-medium text-center"
          >
            Explore Recipes
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
