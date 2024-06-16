import { recipeStore } from "../store/recipeStore";

function useRecipeStore() {
  //States
  const list = recipeStore((state) => state.list);
  const filter = recipeStore((state) => state.filter);
  const recipes = recipeStore((state) => state.recipes);
  const cuisines = recipeStore((state) => state.cuisines);
  const difficulties = recipeStore((state) => state.difficulties);
  const diets = recipeStore((state) => state.diets);
  const searchResults = recipeStore((state) => state.searchResults);
  const loading = recipeStore((state) => state.loading);
  const finish = recipeStore((state) => state.finish);

  //Setter functions
  const setList = recipeStore((state) => state.setList);
  const setFilter = recipeStore((state) => state.setFilter);
  const setLoading = recipeStore((state) => state.setLoading);
  const setRecipes = recipeStore((state) => state.setRecipes);
  const setCuisines = recipeStore((state) => state.setCuisines);
  const setDifficulties = recipeStore((state) => state.setDifficulties);
  const setSearchResults = recipeStore((state) => state.setSearchResults);
  const setDiets = recipeStore((state) => state.setDiets);

  //Getter functions
  const getRecipes = recipeStore((state) => state.getRecipes);
  const getRecipeBy = recipeStore((state) => state.getRecipeBy);
  const getDifficulties = recipeStore((state) => state.getDifficulties);
  const getCuisines = recipeStore((state) => state.getCuisines);
  const getDiets = recipeStore((state) => state.getDiets);

  return {
    list,
    setList,
    filter,
    recipes,
    cuisines,
    difficulties,
    diets,
    searchResults,
    loading,
    finish,
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
