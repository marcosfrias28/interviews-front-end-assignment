import {
  cuisineType,
  difficultyType,
  filterType,
  dietType,
  newRecipesType,
} from "../types/api-types";

export interface recipeStoreTypes {
    //State
    list: "q" | "cuisineId" | "difficultyId" | "dietId";
    filter: filterType;
    recipes: newRecipesType[] | [];
    cuisines: cuisineType[] | [];
    difficulties: difficultyType[] | [];
    diets: dietType[] | [];
    searchResults: newRecipesType[] | [];
    loading: boolean;
    finish: boolean;
    currentPage: number;
  
    //Setter functions
    setFilter: (filter: filterType) => void;
    setCurrentPage: (currentPage: number) => void;
    setFinish: (finish: boolean) => void;
    setLoading: (loading: boolean) => void;
    setRecipes: (recipes: newRecipesType[]) => void;
    setCuisines: (cuisines: cuisineType[]) => void;
    setDifficulties: (difficulties: difficultyType[]) => void;
    setSearchResults: (searchResults: newRecipesType[]) => void;
    setDiets: (diets: dietType[]) => void;
    setList: (list: "q" | "cuisineId" | "difficultyId" | "dietId") => void;
    //Getter functions
    getRecipes: (_page: number, _limit?: number) => void;
    getRecipeBy: (filter: filterType) => void;
    getDifficulties: () => void;
    getCuisines: () => void;
    getDiets: () => void;
  }