import { Layout } from "../Layout";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import useRecipeStore from "../hooks/useRecipeStore";
import { commentType, newRecipesType } from "../types/api-types";
import DifficultyBlock from "../components/ui/DifficultyBlock";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getRecipes } from "../utils/getRecipes";
import { API_URL } from "../utils/API_URL";

// Function to see random positions of the recipes every time the page is loaded
const shuffle = (arr: newRecipesType[]) =>
  [...arr].sort(() => Math.random() - 0.5);

function getStars(comments: commentType[], id: string, name: string) {
  const stars =
    comments?.reduce((acc, comment) => acc + comment.rating, 0) /
    comments?.length;
  return stars;
}

function HomePage() {
  // Setting the title of the page with simple custom hook
  useTitle("Home");
  /*
  Getting all necessary states and functions from the store using zustand
  IMPORTANT NOT GETTING ALL THE STATE AT ONCE, JUST THE ONES NEEDED TO AVOID RE-RENDERING
  --------------------------------------------------------------------------
  */
  const {  cuisines } = useRecipeStore();
  // --------------------------------------------------------------------------

  const { data, fetchNextPage, isFetched, isFetching, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["recipes"],
      queryFn: async ({ pageParam = 0 }) => getRecipes(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length <= 0) {
          return undefined;
        }
        return allPages.length + 1;
      },
    });

  const handeClick = () => {
    fetchNextPage();
  };

  return (
    <Layout>
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-10 font-bold font-lato text-center">
        Explore our <span className="italic">best </span> Recipes!
      </h1>
      <section className="relative flex flex-row flex-wrap gap-10 pt-20 px-5 max-w-screen-2xl mx-auto transition-all place-content-center">
        <a
          href="#header"
          className="group fixed h-14 w-14 flex items-center justify-center bottom-0 right-0 z-40 bg-[#efa482] hover:scale-110 transition-transform m-5 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="transparent"
            width={48}
            height={48}
            viewBox="0 0 24 24"
            className=" rotate-180 group-hover:-translate-y-2 transition-all group-hover:scale-110 stroke-black group-hover:stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m7 10 5 5 5-5"
            />
          </svg>
        </a>
        {isFetched &&
          data?.pages?.map((recipes: any, i: number) =>
            recipes.map((recipe: newRecipesType) => {
              const { id, name, cuisineId, comments, difficultyId, image } =
                recipe;

              const stars = getStars(comments, id, name);

              const cuisine = cuisines?.find(
                (cuisine) => cuisine.id === cuisineId
              );
              return (
                <article
                  key={id}
                  className="min-h-[500px] w-full lg:w-[472px] flex-grow h-fit flex flex-col flex-nowrap gap-3 rounded-3xl overflow-hidden bg-white shadow-xl"
                >
                  {/* RECIPE IMAGE BLOCK */}
                  <div className="w-full rounded-t-3xl h-96 overflow-hidden mb-4 bg-blac transition-all">
                    <Link to={`/recipes/${id}`}>
                      <img
                        loading="lazy"
                        className="h-full w-full object-cover object-center hover:scale-105 transition-all"
                        src={`${API_URL}${image}`}
                        alt={name}
                      />
                    </Link>
                  </div>
                  <h2 className="font-bold text-2xl font-sans mb-4 text-center">
                    {name}
                  </h2>
                  {/* RECIPE DIFFICULTY BLOCK */}
                  <DifficultyBlock
                    className="flex items-center justify-center m-auto mb-2 w-fit gap-2"
                    cuisineId={cuisineId}
                    name={cuisine?.name}
                    difficultyId={difficultyId}
                  />

                  <section className="flex gap-4 items-center justify-center">
                    <Link to={`/recipes/${id}#comments`}>
                      {`(${comments?.length > 0 ? comments?.length : "0"})`}{" "}
                      Comments
                    </Link>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            stars >= i + 1 ? "text-yellow-300" : "text-zinc-500"
                          } ms-1`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                  </section>

                  <Link className="" to={`/recipes/${id}`}>
                    <div className="flex flex-row items-center justify-center group text-center bg-[#fc7c4ab8] py-2 text-medium hover:text-white transition-colors text-black font-medium mt-5">
                      <span>See Recipe</span>
                      <span className="group-hover:rotate-0 rotate-45 transition-transform">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-black group-hover:stroke-white transition-all"
                          width={24}
                          widths={24}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 17 17 7m0 0H8m9 0v9"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })
          )}
      </section>
      <div className="text-center font-bold animate-bounce flex flex-col my-20">
        {!hasNextPage && !isFetching && <span>No more recipes found...</span>}
      </div>
      <div
        className={`${
          !hasNextPage ? "pointer-events-none" : ""
        } flex flex-row justify-center items-center mb-20`}
      >
        <button
          onClick={handeClick}
          className="group flex relative items-center justify-center bg-[#fc7c4a] h-24 w-24 text-xl hover:scale-110 transition-transform text-white font-lato rounded-full mx-auto text-nowrap"
        >
          {isFetching && (
            <div className=" w-36 h-36 absolute -top-5 col-span-full border-black border-t-4 border-b-4 rounded-full animate-spin mx-auto" />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="transparent"
            width={48}
            height={48}
            viewBox="0 0 24 24"
            className=" group-hover:translate-y-2 transition-all group-hover:scale-110 stroke-black group-hover:stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="m7 10 5 5 5-5"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
}

export default HomePage;
