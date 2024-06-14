import { MouseEventHandler, useEffect, useState } from "react";
import { useRecipeStore } from "../store/recipeStore";
import { Layout } from "../App";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Flag } from "../components/ui/FlagIcons";
import DifficultyLabel from "../components/ui/DifficultyLabel";
import useTitle from "../hooks/useTitle";

function SearchPage() {
  // Setting the title of the page with simple custom hook
  useTitle("Search");

  const searchResults = useRecipeStore((state) => state.searchResults);
  const cuisines = useRecipeStore((state) => state.cuisines);
  const diets = useRecipeStore((state) => state.diets);
  const getRecipeBy = useRecipeStore((state) => state.getRecipeBy);

  const [filter, setFilter] = useState({
    cuisineId: "",
    difficultyId: "",
    dietId: "",
  });
  useEffect(() => {
    getRecipeBy(filter, "");
    console.log(filter);
  }, [filter]);

  function handleCuisineChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.getAttribute("value") as string;
    setFilter((prevState) => ({ ...prevState, cuisineId: value }));
  }
  function handleDifficultyClick(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.getAttribute("value") as string;
    setFilter((prevState) => ({ ...prevState, difficultyId: value }));
  }

  return (
    <Layout>
      <h1 className="text-7xl font-bold text-center">
        Search our <span className="italic">best </span> Recipes!
      </h1>
      <section className=" relative h-auto w-full flex flex-row gap-20">

      <aside className="h-full sticky pt-20 bg-transparent w-1/5 z-10 top-0 left-0">
        <h2 className="text-4xl font-semibold text-center">Filters</h2>
        <section className="h-full w-full">
          <div className="p-10">
            <h3 className="text-xl font-semibold mb-5">Cuisines</h3>
            <form action="">
              {cuisines.map((cuisine) => (
                <div key={cuisine.id}>
                  <label
                    htmlFor={cuisine.name}
                    className=" has-[input:checked]:opacity-100 has-[input:checked]:scale-110 hover:scale-105 transition-transform opacity-80 text-sm font-medium flex items-center gap-2"
                  >
                    <Flag nationality={cuisine.id}></Flag> {cuisine.name}
                    <input
                      onChange={(e) => handleCuisineChange(e)}
                      className="hidden"
                      type="radio"
                      name="cuisine"
                      id={cuisine.name}
                      value={cuisine.id}
                    />
                  </label>
                </div>
              ))}
            </form>
            <div className="flex flex-col gap-5 p-5">
              <h3 className="text-xl font-semibold">Recipe Difficulty</h3>
              <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-4">
                  <label
                    htmlFor="difficulty"
                    className="has-[input:checked]:opacity-100 has-[input:checked]:scale-125 hover:scale-105 transition-transform opacity-60 text-sm font-medium flex items-center gap-2"
                  >
                    <span className="pointer-events-none text-white bg-zinc-500 focus:ring-4 font-medium rounded-full text-sm px-5 py-1.5 text-center">All</span>
                    <input
                      onChange={(e) => handleDifficultyClick(e)}
                      className="hidden"
                      type="radio"
                      name="cuisine"
                      id="difficulty"
                      value=""
                    />
                  </label>
                {
                  // Generate 3 buttons with difficulty levels
                  [...Array(3)].map((_, i) => (
                  <label
                   key={i}
                    htmlFor={'difficulty' + i}
                    className=" has-[input:checked]:opacity-100 has-[input:checked]:scale-125 hover:scale-105 transition-transform opacity-80 text-sm font-medium flex items-center gap-2"
                  >
                    <DifficultyLabel difficulty={i + 1} />
                    <input
                      onChange={(e) => handleDifficultyClick(e)}
                      className="hidden"
                      type="radio"
                      name="cuisine"
                      id={'difficulty' + i}
                      value={i + 1}
                    />
                  </label>
                  ))
                }
                </div>
              </div>
            </div>
          </div>
        </section>
      </aside>

      <section className="flex flex-col relative top-0 mt-20 gap-10 drop-shadow-lg max-w-screen-xl">
        {searchResults.length === 0 && (
          <p className="text-center">
            No recipes found by your search input, try again
          </p>
        )}
        {searchResults.length > 0 &&
          searchResults.map((recipe, i) => {
            if (!recipe.name) return toast.error("Something went wrong");
            const {
              id,
              name,
              cuisineId,
              ingredients,
              instructions,
              difficultyId,
              image,
            } = recipe;
            const cuisine = cuisines?.find(
              (cuisine) => cuisine.id === cuisineId
            );
            return (
              <article
                key={id}
                className="flex flex-col lg:flex-row flex-nowrap max-w-screen-xl bg-zinc-100 rounded-xl p-5 "
              >
                <div className="relative w-full h-full max-h-96 max-w-2xl overflow-hidden rounded-xl lg:rounded-se-full lg:rounded-ee-full">
                  <Link to={`/recipes/${id}`}>
                    <img
                      className=" object-cover object-center w-full"
                      src={`http://localhost:8080${image}`}
                      alt={name}
                    />
                  </Link>
                  <div className="absolute z-10 bottom-0 left-0 flex gap-5 m-3">
                    <span className="flex items-center text-nowrap justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto">
                      <Flag nationality={cuisineId} />{" "}
                      <span className="hidden lg:block"> {cuisine?.name}</span>
                    </span>
                    <span className="flex items-center justify-center gap-2 text-sm font-medium border border-white text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto">
                      <span className="hidden lg:block">Difficulty: </span>
                      <DifficultyLabel difficulty={difficultyId} />
                    </span>
                  </div>
                </div>
                <h2 className="font-semibold text-2xl font-sans text-center">
                  {name}
                </h2>
                <div className="flex justify-between mb-7">
                  <ul className="w-1/2">
                    <li className="text-center font-semibold text-sm italic">
                      Ingredients
                    </li>
                    {ingredients.map((ingredient: string, i: number) => (
                      <li className=" list-inside list-item list-disc" key={i}>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                  <div className=" bg-black w-[3px] mx-5" />
                  <div className="w-1/2">
                    <h3 className="text-center font-semibold text-sm italic">
                      {" "}
                      instructions
                    </h3>
                    <p>{instructions}</p>
                  </div>
                </div>
              </article>
            );
          })}
      </section>
      </section>

    </Layout>
  );
}

export default SearchPage;
