import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../utils/API_URL";
import { toast } from "sonner";
import {
  cuisineType,
  difficultyType,
  dietType,
  newRecipesType,
  commentType,
} from "../types/api-types";
import { recipeStoreTypes } from "../types/recipe-store";

export const recipeStore = create<recipeStoreTypes>()((set, get) => ({
  recipes: [],
  cuisines: [],
  difficulties: [],
  diets: [],

  //Setter functions
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
    const { setCuisines } = get();
    axios
      .get(`${API_URL}/cuisines`)
      .then(({ data }) => setCuisines(data))
      .catch((e) => toast.error('Something went wrong getting "cuisines"'))
  },
}));
