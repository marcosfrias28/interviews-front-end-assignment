import axios from "axios";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { API_URL } from "../Layout";
import { toast } from "sonner";
import {

  newRecipesType,
} from "../types/api-types";
import { searchStoreTypes } from "../types/recipe-store";



export const searchStore = create<searchStoreTypes>()(
  devtools(
    persist(
      (set, get) => ({
        list: "q",
        filter: { q: "", cuisineId: "", difficultyId: "", dietId: "" },
        searchResults: [],
        setFilter: (filter) => set({ filter }, false, "set filter: " + filter),
        setSearchResults: (searchResults: newRecipesType[]) =>
          set({ searchResults }, false, "set searchResults"),
        setList: (list) => set({ list }, false, "set list: " + list),

        getRecipeBy: ({ q, cuisineId, difficultyId, dietId }) => {
          const { setSearchResults } = get();
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
            );
        },
      }),
      { name: "searchStore" }
    )
  )
);