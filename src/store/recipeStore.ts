import axios, { ResponseType } from "axios";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { API_URL } from "../App";
import { toast } from "sonner";
import { data } from "autoprefixer";

interface recipeTypes {
  filter: string;
  recipes: any[];
  cuisines: any[];
  loading: boolean;
  setFilter: (filter: "name" | "cuisine" | "difficulty" | "dietary") => void;
  setLoading: (loading: boolean) => void;
  setRecipes: (recipes: Array<any>) => void;
  getAllRecipes: (_limit: number, _page: number) => void;
  getRecipeBy: (
    filter: "id" | "name" | "cuisine" | "difficulty" | "dietary",
    input: string
  ) => void;
  getCuisines: () => void;

  getData: (QUERY: string) => Promise<ResponseType>;
}

export const useRecipeStore = create<recipeTypes>()(
  devtools(
    persist(
      (set, get) => ({
        filter: "name",

        cuisines: [],

        recipes: [],

        loading: true,

        setFilter: (filter) => {
          set({ filter }, false, "filter: " + filter);
        },
        setRecipes: (recipes: Array<any>) => {
          set({ recipes }, false, "recipes: " + recipes);
        },

        setLoading: (loading: boolean) =>
          set({ loading }, false, "loading: " + loading),

        getData: async (QUERY: string) => {
          const { setLoading } = get();
          setLoading(true);
          const res = await axios.get(QUERY);
          if (res.request.status !== 200) {
            toast.error("Something went wrong");
          }
          const data = await res.data;
          setLoading(false);
          return data;
        },

        getAllRecipes: (_limit, _page) => {
          const limit = _limit || 12;
          const page = _page || 1;
          const { setRecipes, getData } = get();
          getData(`${API_URL}/recipes?_limit=${limit}&_page=${page}`).then(
            (data) => setRecipes(data)
          );
        },

        getRecipeById: (id) => {},

        getRecipeBy: (filter, input) => {
          // Filter recipes by name, cuisine, difficulty, or dietary
          const QUERY = `${API_URL}/recipes?${filter}=${input}`;
        },

        getCuisines: () => {
          const { setLoading } = get();
          setLoading(true);
          axios
            .get(`${API_URL}/cuisines`)
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
