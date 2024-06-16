import { MouseEventHandler, useEffect, useState } from "react";
import useRecipeStore from "../hooks/useRecipeStore";
import { Layout } from "../App";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { GetFlag } from "../components/ui/FlagIcons";
import DifficultyLabel from "../components/ui/DifficultyLabel";
import useTitle from "../hooks/useTitle";
import { filterType } from "../types/api-types";

function SearchPage() {
  // Setting the title of the page with simple custom hook
  useTitle("Search");
  const navigate = useNavigate();

  /*
  Getting all necessary states and functions from the store using zustand
  IMPORTANT NOT GETTING THE WHOLE STATE AT ONCE, JUST THE ONES NEEDED TO AVOID RE-RENDERING
   -------------------------------------------------------------------------------------------------------------------------
  */
  const {
    searchResults,
    getCuisines,
    cuisines,
    diets,
    getRecipeBy,
    filter,
    setFilter,
  } = useRecipeStore();
  // ----------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    getCuisines();
    getRecipeBy(filter);
  }, [filter]);

  function handleCuisineChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.getAttribute("value") as string;
    setFilter({ ...filter, q: "", cuisineId: value });
  }
  function handleDifficultyClick(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.getAttribute("value") as string;
    setFilter({ ...filter, q: "", difficultyId: value });
  }

  function handleClickRecipe(id: string) {
    navigate(`/recipes/${id}`);
  }

  return (
    <Layout>
        <h1 className="text-7xl font-bold font-lato text-center mb-10">
          Search our <span className="italic">best </span> Recipes!
        </h1>
        <section className="relative h-full w-full max-h-dvh max-w-screen-2xl grid grid-cols-[20%,1fr] gap-20 place-content-center px-10">
          <aside className="flex flex-col h-full w-full static md:sticky col-span-[33%] place-self-start bg-[#f7f7f7] z-20 left-0 top-0">
            <h2 className="text-4xl font-semibold font-lato text-center">Filters</h2>
            <div className="">
              <h3 className="text-xl font-semibold">Cuisines</h3>
              <div className="w-full max-h-96 overflow-scroll overflow-x-hidden overflow-y-auto">
                {cuisines.map((cuisine) => (
                  <div key={cuisine.id}>
                    <label
                      htmlFor={cuisine.name}
                      className=" has-[input:checked]:opacity-100 has-[input:checked]:translate-x-5 hover:scale-105 transition-transform opacity-80 text-sm font-medium flex items-center gap-1"
                    >
                      <GetFlag nationality={cuisine.id}></GetFlag>
                      <span className="text-nowrap">{cuisine.name}</span>
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
              </div>
              <div className="flex flex-col gap-2 pt-5 w-48">
                <h3 className="text-xl font-semibold text-wrap">Recipe Difficulty</h3>
                <div className="flex flex-row flex-wrap gap-2">
                  <label
                    htmlFor="difficulty"
                    className="has-[input:checked]:opacity-100 has-[input:checked]:scale-125 hover:scale-105 transition-transform opacity-60 text-sm font-medium flex items-center gap-2"
                  >
                    <span className="pointer-events-none text-white bg-zinc-500 focus:ring-4 font-medium rounded-full text-sm px-5 py-1.5 text-center">
                      All
                    </span>
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
                        htmlFor={"difficulty" + i}
                        className=" has-[input:checked]:opacity-100 has-[input:checked]:scale-125 hover:scale-105 transition-transform opacity-80 text-sm font-medium flex items-center gap-2"
                      >
                        <DifficultyLabel difficulty={i + 1} />
                        <input
                          onChange={(e) => handleDifficultyClick(e)}
                          className="hidden"
                          type="radio"
                          name="cuisine"
                          id={"difficulty" + i}
                          value={i + 1}
                        />
                      </label>
                    ))
                  }
                </div>
              </div>
            </div>
          </aside>

          <section className="flex flex-col w-full overflow-scroll overflow-x-hidden col-span-[100%] text-center gap-10 drop-shadow-lg max-w-screen-xl">

            {searchResults.length === 0 && (
              <p className="mx-auto text-center">
                No recipes found by your search inputs, try again
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
                    onClick={() => handleClickRecipe(id)}
                    className="flex flex-col cursor-pointer hover:scale-105 transition-transform lg:flex-row flex-nowrap max-w-screen-xl bg-zinc-100 rounded-xl p-5 "
                  >
                    <div className="relative w-full h-96 overflow-hidden rounded-xl lg:rounded-se-full lg:rounded-ee-full">
                      <img
                        className=" object-cover object-center w-full"
                        src={`http://localhost:8080${image}`}
                        alt={name}
                      />
                      <div className="absolute z-10 bottom-0 left-0 flex gap-5 m-3">
                        <span className="flex items-center text-nowrap justify-center gap-2 text-sm font-medium text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto">
                          <GetFlag nationality={cuisineId} />
                          <span className="hidden lg:block">
                            {cuisine?.name}
                          </span>
                        </span>
                        <span className="flex items-center justify-center gap-2 text-sm font-medium text-white bg-gray-500/20 backdrop-blur-lg py-1 rounded-full px-3 italic mx-auto">
                          <span className="hidden lg:block">Difficulty: </span>
                          <DifficultyLabel difficulty={difficultyId} />
                        </span>
                      </div>
                    </div>
                    <aside>
                      <h2 className="font-semibold text-2xl font-sans text-center ">
                        {name}
                      </h2>
                      <div className="flex justify-between mb-7">
                        <ul className="w-1/2">
                          <li className="text-center font-semibold text-sm italic">
                            Ingredients
                          </li>
                          {ingredients.map((ingredient: string, i: number) => (
                            <li
                              className=" list-inside list-item list-disc"
                              key={i}
                            >
                              {ingredient}
                            </li>
                          ))}
                        </ul>
                        <div className=" bg-black w-[3px] mx-5" />
                        <div className="w-1/2">
                          <h3 className="text-center font-semibold text-sm italic">
                            instructions
                          </h3>
                          <p>{instructions}</p>
                        </div>
                      </div>
                    </aside>
                  </article>
                );
              })}
          </section>
        </section>
    </Layout>
  );
}

export default SearchPage;
