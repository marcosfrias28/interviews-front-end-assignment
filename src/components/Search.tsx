import { useEffect, useState } from "react";
import { toast } from "sonner";
import useRecipeStore from "../hooks/useRecipeStore";
import SearchIcon from "./icons/search";
import React from "react";
import {
  cuisineType,
  dietType,
  difficultyType,
  filterSearchType,
  filterType,
} from "../types/api-types";

interface Props {
  mobile?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

function Search({ mobile }: Props) {
  //Local states, used only in this component
  const [input, setInput] = useState<string>("");

  /*
  Getting all necessary states and functions from the store using zustand
  IMPORTANT NOT GETTING THE WHOLE STATE AT ONCE, JUST THE ONES NEEDED TO AVOID RE-RENDERING
   -------------------------------------------------------------------------------------------------------------------------
  */
  const {
    list,
    setList,
    diets,
    getDiets,
    difficulties,
    getDifficulties,
    filter,
    setFilter,
    searchResults,
    cuisines,
    getRecipeBy,
  } = useRecipeStore();
  // ----------------------------------------------------------------------------------------------------------------------

  // Fetching all recipes and cuisines on component mount
  useEffect(() => {
    getDiets();
    getDifficulties();
  }, []);

  // Resetting the input field when the filter change or the submition is made
  useEffect(() => {
    setInput("");
  }, [filter, searchResults]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //Checking if the input is a cuisine, difficulty or diet
    const cuisine = cuisines.find(
      (cuisine: cuisineType) => cuisine.name === input
    );
    const difficulty = difficulties.find(
      (difficulty: difficultyType) => difficulty.name === input
    );
    const diet = diets.find((diet: dietType) => diet.name === input);
    //Setting the filter based on the input
    if (list === "q") {
      setFilter({ dietId: "", difficultyId: "", cuisineId: "", q: input });
    } else if (list === "cuisineId" && cuisine) {
      setFilter({ q: "", dietId: "", difficultyId: "", cuisineId: cuisine.id });
    } else if (list === "difficultyId" && difficulty) {
      setFilter({
        q: "",
        dietId: "",
        cuisineId: "",
        difficultyId: difficulty.id,
      });
    } else if (list === "dietId" && diet) {
      setFilter({ cuisineId: "", q: "", difficultyId: "", dietId: diet.id });
    }

    setInput("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="/search"
      className={
        !mobile
          ? "relative hidden md:block w-full"
          : "relative md:hidden w-full"
      }
    >
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <SearchIcon />
        <span className="sr-only">Search icon</span>
      </div>
      <input
        list={list}
        autoComplete="off"
        id="search-navbar"
        className="block p-2 ps-10 pe-32 text-sm w-full text-gray-900 border-yellow-500 rounded-full bg-gray-100 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
        placeholder="Search..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <datalist id="cuisineId">
        {cuisines.map((cuisine: cuisineType) => (
          <option key={cuisine.id} value={cuisine.name} />
        ))}
      </datalist>
      <datalist id="difficultyId">
        {difficulties.map((difficulty: difficultyType) => (
          <option key={difficulty.id} value={difficulty.name} />
        ))}
      </datalist>
      <datalist id="dietId">
        {diets.map((diet: dietType) => (
          <option key={diet.id} value={diet.name} />
        ))}
      </datalist>

      {/* DESKTOP FILTER SELECT */}
      <div className="absolute inset-y-0 end-0 bg-transparent ">
        <select
          onChange={(e) => setList(e.target.value as filterSearchType)}
          className="text-sm w-32 h-full bg-transparent border border-black/20 rounded-tr-full rounded-br-full outline-0 focus:ring-0 focus:ring-yellow-500 focus:border-yellow-500"
          value={list}
          aria-placeholder="Search by..."
          name=""
          id=""
        >
          <option value="q">Name</option>
          <option value="cuisineId">Cuisine</option>
          <option value="difficultyId">Difficulty</option>
          <option value="dietId">Dietary</option>
        </select>
      </div>
    </form>
  );
}

export default Search;
