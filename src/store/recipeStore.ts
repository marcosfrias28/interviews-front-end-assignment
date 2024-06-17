import axios from "axios";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { API_URL } from "../Layout";
import { toast } from "sonner";
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

  //Setter functions
  setFilter: (filter: filterType) => void;
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

export const recipeStore = create<recipeStoreTypes>()(
  devtools(
    (set, get) => ({
      //State

      /*
        "q" string represents the search query for
        the recipes that you select on filters or search

        "q" is the default value for the list
        and the others values are "cuisineId", "difficultyId", "dietId"
        */
      list: "q",

      filter: { q: "", cuisineId: "", difficultyId: "", dietId: "" },
      recipes: [],
      cuisines: [],
      difficulties: [],
      diets: [],
      searchResults: [],
      loading: true,
      finish: false,

      //Setter functions
      setFilter: (filter) => set({ filter }, false, "set filter: " + filter),
      setList: (list) => set({ list }, false, "set list: " + list),
      setLoading: (loading: boolean) =>
        set({ loading }, false, "set loading: " + loading),
      setFinish: (finish: boolean) =>
        set({ finish }, false, "set finish: " + finish),
      setRecipes: (recipes: newRecipesType[]) =>
        set({ recipes }, false, "set loading"),
      setDifficulties: (difficulties: difficultyType[]) =>
        set({ difficulties }, false, "set difficulties "),
      setDiets: (diets: dietType[]) => set({ diets }, false, "set diets"),
      setCuisines: (cuisines: cuisineType[]) =>
        set({ cuisines }, false, "set cuisines"),
      setSearchResults: (searchResults: newRecipesType[]) =>
        set({ searchResults }, false, "set searchResults"),

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
                }).catch(() => toast.error('Error getting comments')).finally(() => {set((state) => ({
                  ...state,
                  recipes: [...newRecipes],
                }));});
            });
          })
          .catch((e) => toast.error('Something went wrong getting "recipes"'))
          .finally(() => {
            setLoading(false);
          });
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
          .catch((e) =>
            toast.error('Something went wrong getting "difficulties"')
          );
      },

      getRecipeBy: ({ q, cuisineId, difficultyId, dietId }) => {
        const { setSearchResults, setLoading } = get();
        setLoading(true);
        let QUERY = `${API_URL}/recipes?`;
        // Filter recipes by name, cuisine, difficulty, or dietary
        if (q !== "") QUERY += `q=${q}&`;
        if (cuisineId !== "") QUERY += `cuisineId=${cuisineId}&`;
        if (difficultyId !== "") QUERY += `difficultyId=${difficultyId}&`;
        if (dietId !== "") QUERY += `dietId=${dietId}&`;
        axios
          .get(QUERY)
          .then(({ data }) => setSearchResults(data))
          .catch((e) => toast.error('Something went wrong getting "Recipies"'))
          .finally(() => setLoading(false));
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
    }),
    { name: "recipeStore" }
  )
);
