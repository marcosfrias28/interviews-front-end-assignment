import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../Layout";
import { toast } from "sonner";
import {
  cuisineType,
  difficultyType,
  dietType,
  newRecipesType,
} from "../types/api-types";
import { recipeStoreTypes } from "../types/recipe-store";

export const recipeStore = create<recipeStoreTypes>()((set, get) => ({
  currentPage: 1,
  recipes: [],
  cuisines: [],
  difficulties: [],
  diets: [],

  loading: true,
  finish: false,

  //Setter functions
  setCurrentPage: (currentPage) => set({ currentPage }),
  setLoading: (loading: boolean) => set({ loading }),
  setFinish: (finish: boolean) => set({ finish }),
  setRecipes: (recipes: newRecipesType[]) => set({ recipes }),
  setDifficulties: (difficulties: difficultyType[]) => set({ difficulties }),
  setDiets: (diets: dietType[]) => set({ diets }),
  setCuisines: (cuisines: cuisineType[]) => set({ cuisines }),

  //Getter functions

  /*
        Method to get recipes from the API
        it receives the page number and the limit of recipes
        and sets the recipes in the state,

        retrieves the comments and ratings for each recipe and sets them in the state
        */
  getRecipes: async (_page, _limit) => {
    if (!_limit) _limit = 100;
    let newRecipes: newRecipesType[] = [];
    const { setRecipes, recipes, setFinish, setLoading } = get();
    setLoading(true);
    setFinish(false);
    axios
      .get(`${API_URL}/recipes?_page=${_page}&_limit=${_limit}`)
      .then((resRecipes) => {
        if (resRecipes.data.length === 0) {
          setFinish(true);
          return;
        }
        resRecipes.data.forEach((recipe: newRecipesType) => {
          axios
            .get(`${API_URL}/recipes/${recipe.id}/comments`)
            .then((resComments) => {
              recipe.comments = resComments.data;
              newRecipes.push(recipe);
            })
            .catch(() => toast.error("Error getting comments"))
            .finally(() => {
              setRecipes([...recipes, ...newRecipes]);
            });
        });
      })
      .catch((e) => toast.error('Something went wrong getting "recipes"'))
      .finally(() => setLoading(false));
  },

  getDiets: () => {
    const { setDiets } = get();

    axios
      .get(`${API_URL}/diets`)
      .then(({ data }) => setDiets(data))
      .catch((e) => toast.error('Something went wrong getting "diets"'));
  },

  getDifficulties: () => {
    const { setDifficulties } = get();
    axios
      .get(`${API_URL}/difficulties`)
      .then(({ data }) => setDifficulties(data))
      .catch((e) => toast.error('Something went wrong getting "difficulties"'));
  },

  getCuisines: () => {
    const { setCuisines, setLoading } = get();
    setLoading(true);
    axios
      .get(`${API_URL}/cuisines`)
      .then(({ data }) => setCuisines(data))
      .catch((e) => toast.error('Something went wrong getting "cuisines"'))
      .finally(() => setLoading(false));
  },
}));
