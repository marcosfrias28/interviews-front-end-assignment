import axios, { ResponseType } from "axios";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { API_URL } from "../App.tsx";
import { toast } from "sonner";
import { cuisineType, difficultyType, filterType, recipeType, dietType } from "../types/api-types.ts";


export interface recipeStoreTypes {
 //State
  filter: filterType;
  recipes: recipeType[];
  cuisines: cuisineType[];
  difficulties: difficultyType[];
  diets: dietType[];
  loading: boolean;

  //Setter functions
  setFilter: (filter: filterType) => void;
  setLoading: (loading: boolean) => void;
  setRecipes: (recipes: recipeType[]) => void;
  setCuisines: (cuisines: cuisineType[]) => void;
  setDifficulties: (difficulties: difficultyType[]) => void;

  //Getter functions
  getRecipes: (_limit: number, _page: number) => void;
  getRecipeBy: (
    filter: filterType,
    input: string
  ) => void;
  getCuisines: () => void;
}

export const useRecipeStore = create<recipeStoreTypes>()(
  devtools(
    persist((set, get) => ({
        //State
        filter: "q",
        recipes: [],
        cuisines: [],
        difficulties: [],
        diets: [],
        loading: true,

        //Setter functions
        setFilter: (filter) => set({ filter }, false, "set filter: " + filter),
        setLoading: (loading: boolean) => set({ loading }, false, "set loading: " + loading),
        setRecipes: (recipes: Array<recipeType>) => set({ recipes }, false, "set loading: " + recipes),
        setDifficulties: (difficulties: any[]) => set({difficulties}, false, "set difficulties: " + difficulties),
        setDiets: (diets: any[]) => set({diets}, false, "set diets: " + diets),
        setCuisines: (cuisines: any[]) => set({ cuisines }, false, "set cuisines: " + cuisines),

        //Getter functions
        getRecipes: (_limit = 12, _page = 1) => {
          const { setRecipes, setLoading } = get();
          setLoading(true);
          axios.get(`${API_URL}/recipes?_limit=${_limit}&_page=${_page}`).then((response) => setRecipes(response.data)).finally(() => setLoading(false));
        },

        getDifficulties: () => {
            const { setDifficulties } = get();
            axios.get(`${API_URL}/difficulties`).then((response) => setDifficulties(response.data)).catch((e) => toast.error('Something went wrong'))
        },

        getRecipeBy: (filter, input) => {
          const { setRecipes, setLoading } = get();
          setLoading(true);
          // Filter recipes by name, cuisine, difficulty, or dietary
          axios.get(`${API_URL}/recipes?${filter}=${input}`).then((response) => setRecipes(response.data)).catch((e) => toast.error('Something went wrong')).finally(() => setLoading(false));
        },

        getCuisines: () => {
          const { setCuisines, setLoading } = get();
          setLoading(true);
          axios
            .get(`/cuisines`)
            .then(({data}) => setCuisines(data))
            .catch((e) => toast.error("Something went wrong"))
            .finally(() => setLoading(false));
        },
      }),
      { name: "recipeStore" }
    )
  )
);
