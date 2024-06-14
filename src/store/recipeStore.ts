import axios from "axios";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { API_URL } from "../App";
import { toast } from "sonner";
import {
  cuisineType,
  difficultyType,
  filterType,
  recipeType,
  dietType,
} from "../types/api-types";

export interface recipeStoreTypes {
  //State
  list: "q" | "cuisineId" | "difficultyId" | "dietId";
  filter: filterType;
  recipes: recipeType[] | [];
  cuisines: cuisineType[] | [];
  difficulties: difficultyType[] | [];
  diets: dietType[] | [];
  searchResults: recipeType[] | [];
  loading: boolean;

  //Setter functions
  setFilter: (filter: filterType) => void;
  setLoading: (loading: boolean) => void;
  setRecipes: (recipes: recipeType[]) => void;
  setCuisines: (cuisines: cuisineType[]) => void;
  setDifficulties: (difficulties: difficultyType[]) => void;
  setSearchResults: (searchResults: recipeType[]) => void;
  setDiets: (diets: dietType[]) => void;
  setList: (list: "q" | "cuisineId" | "difficultyId" | "dietId") => void;
  //Getter functions
  getRecipes: (_limit: number, _page: number) => void;
  getRecipeBy: (filter: filterType) => void;
  getDifficulties: () => void;
  getCuisines: () => void;
  getDiets: () => void;
}

export const recipeStore = create<recipeStoreTypes>()(
  devtools(
    persist(
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

        //Setter functions
        setFilter: (filter) => set({ filter }, false, "set filter: " + filter),
        setList: (list) => set({ list }, false, "set list: " + list),
        setLoading: (loading: boolean) =>
          set({ loading }, false, "set loading: " + loading),
        setRecipes: (recipes: recipeType[]) =>
          set({ recipes }, false, "set loading: " + recipes),
        setDifficulties: (difficulties: difficultyType[]) =>
          set({ difficulties }, false, "set difficulties: " + difficulties),
        setDiets: (diets: dietType[]) =>
          set({ diets }, false, "set diets: " + diets),
        setCuisines: (cuisines: cuisineType[]) =>
          set({ cuisines }, false, "set cuisines: " + cuisines),
        setSearchResults: (searchResults: recipeType[]) =>
          set({ searchResults }, false, "set searchResults: " + searchResults),

        //Getter functions
        getRecipes: (_limit = 12, _page = 1) => {
          const { setRecipes, setLoading } = get();
          setLoading(true);
          axios
            .get(`${API_URL}/recipes?_limit=${_limit}&_page=${_page}`)
            .then(({ data }) => setRecipes(data))
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
            .catch((e) =>
              toast.error('Something went wrong getting "Recipies"')
            )
            .finally(() => setLoading(false));
        },

        getCuisines: () => {
          const { setCuisines, setLoading } = get();
          setLoading(true);
          axios
            .get(`${API_URL}/cuisines`)
            .then(({ data }) => setCuisines(data))
            .catch((e) =>
              toast.error('Something went wrong getting "cuisines"')
            )
            .finally(() => setLoading(false));
        },
      }),
      { name: "recipeStore" }
    )
  )
);
