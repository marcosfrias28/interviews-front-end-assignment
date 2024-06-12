import axios from "axios";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { ENDPOINT } from "../App";
import { toast } from "sonner";

interface filterTypes {
  filter: "" | "Cuisine" | "Difficulty" | "Dietary";
}

interface recipeTypes {
  filter: string;
  recipes: any[];
  cuisines: any[];
  loading: boolean;
  setFilter: (filter: filterTypes) => void;
  setLoading: (loading: boolean) => void;
  getAllRecipes: () => void;
  getCuisines: () => void;
}

export const useRecipeStore = create<recipeTypes>()(
  devtools(
    persist(
      (set, get) => ({
        filter: "",

        cuisines: [],

        recipes: [],

        loading: true,

        setFilter: (filter: filterTypes) => {
            set({ filter: filter.filter }, false, "filter:" + filter);
         },

        setLoading: (loading: boolean) =>
          set({ loading }, false, "loading:" + loading),
        getAllRecipes: () => {
          const { setLoading } = get();
          setLoading(true);
          axios
            .get(`${ENDPOINT}/recipes`)
            .then((response) => {
              set((state) => ({ ...state, recipes: response.data }));
            })
            .catch((e) => toast.error("Something went wrong"))
            .finally(() => setLoading(false));
        },

        getCuisines: () => {
          const { setLoading } = get();
          setLoading(true);
          axios
            .get(`${ENDPOINT}/cuisines`)
            .then((response) => {
              set((state) => ({ ...state, cuisines: response.data }));
            })
            .catch((e) => toast.error("Something went wrong"))
            .finally(() => setLoading(false));
        },
      }),
      { name: "recipeStore" }
    )
  )
);
