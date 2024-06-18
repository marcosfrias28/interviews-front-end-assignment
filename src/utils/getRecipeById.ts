import axios from "axios";
import { API_URL } from "./API_URL";
import { commentType, newRecipesType } from "../types/api-types";

type getRecipesType = (id: string) => Promise<newRecipesType[]>;

export const getRecipeById: getRecipesType = async (id) => {
    const resRecipes = await axios.get(
      `${API_URL}/recipes/${id}`
    );
    const resComments = await axios.get(`${API_URL}/recipes/${id}/comments`);
    resRecipes.data.comments = resComments;

    return resRecipes.data;
  }