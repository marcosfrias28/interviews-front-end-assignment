import {
  cuisineType,
  difficultyType,
  filterType,
  dietType,
  newRecipesType,
} from "./api-types";

export interface recipeStoreTypes {
    //State
    recipes: newRecipesType[] | [];
    cuisines: cuisineType[] | [];
    difficulties: difficultyType[] | [];
    diets: dietType[] | [];

    //Setter functions
    setRecipes: (recipes: newRecipesType[]) => void;
    setCuisines: (cuisines: cuisineType[]) => void;
    setDifficulties: (difficulties: difficultyType[]) => void;
    setDiets: (diets: dietType[]) => void;

    //Getter functions
    getDifficulties: () => void;
    getCuisines: () => void;
    getDiets: () => void;
  }

  export interface searchStoreTypes {
    list: "q" | "cuisineId" | "difficultyId" | "dietId";
    filter: filterType;
    searchResults: newRecipesType[] | [];
  
    setFilter: (filter: filterType) => void;
    setList: (list: "q" | "cuisineId" | "difficultyId" | "dietId") => void;
  
    getRecipeBy: (filter: filterType) => void;
    setSearchResults: (searchResults: newRecipesType[]) => void;
  }