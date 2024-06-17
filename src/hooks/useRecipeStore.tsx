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
  const loading = recipeStore((state) => state.loading);
  const finish = recipeStore((state) => state.finish);
  const currentPage = recipeStore((state) => state.currentPage);

  //Setter functions
  const setList = searchStore((state) => state.setList);
  const setCurrentPage = recipeStore((state) => state.setCurrentPage);
  const setFilter = searchStore((state) => state.setFilter);
  const setLoading = recipeStore((state) => state.setLoading);
  const setRecipes = recipeStore((state) => state.setRecipes);
  const setCuisines = recipeStore((state) => state.setCuisines);
  const setDifficulties = recipeStore((state) => state.setDifficulties);
  const setSearchResults = searchStore((state) => state.setSearchResults);
  const setDiets = recipeStore((state) => state.setDiets);
  const setFinish = recipeStore((state) => state.setFinish);

  //Getter functions
  const getRecipes = recipeStore((state) => state.getRecipes);
  const getRecipeBy = searchStore((state) => state.getRecipeBy);
  const getDifficulties = recipeStore((state) => state.getDifficulties);
  const getCuisines = recipeStore((state) => state.getCuisines);
  const getDiets = recipeStore((state) => state.getDiets);

  return {
    list,
    currentPage,
    filter,
    recipes,
    cuisines,
    difficulties,
    diets,
    searchResults,
    loading,
    finish,
    setCurrentPage,
    setList,
    setFinish,
    setFilter,
    setLoading,
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
