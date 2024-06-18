import { recipeStore } from "../store/recipeStore";
import { searchStore } from "../store/searchStore";

function useRecipeStore() {
  //States
  const list = searchStore((state) => state.list);
  const filter = searchStore((state) => state.filter);
  const recipes = recipeStore((state) => state.recipes);
  const cuisines = recipeStore((state) => state.cuisines);
  const difficulties = recipeStore((state) => state.difficulties);
  const diets = recipeStore((state) => state.diets);
  const searchResults = searchStore((state) => state.searchResults);

  //Setter functions
  const setList = searchStore((state) => state.setList);
  const setFilter = searchStore((state) => state.setFilter);
  const setRecipes = recipeStore((state) => state.setRecipes);
  const setCuisines = recipeStore((state) => state.setCuisines);
  const setDifficulties = recipeStore((state) => state.setDifficulties);
  const setSearchResults = searchStore((state) => state.setSearchResults);
  const setDiets = recipeStore((state) => state.setDiets);

  //Getter functions
  const getRecipeBy = searchStore((state) => state.getRecipeBy);
  const getDifficulties = recipeStore((state) => state.getDifficulties);
  const getCuisines = recipeStore((state) => state.getCuisines);
  const getDiets = recipeStore((state) => state.getDiets);

  return {
    list,
    filter,
    recipes,
    cuisines,
    difficulties,
    diets,
    searchResults,
    setList,
    setFilter,
    setRecipes,
    setCuisines,
    setDifficulties,
    setSearchResults,
    setDiets,
    getRecipes,
    getRecipeBy,
    getDifficulties,
    getCuisines,
    getDiets,
  };
}

export default useRecipeStore;
