import axios from "axios";
import { API_URL } from "./API_URL";
import { commentType, newRecipesType } from "../types/api-types";

type getRecipesType = (page: number) => Promise<newRecipesType[]>;

export const getRecipes: getRecipesType = async (_page: number) => {
    const resRecipes = await axios.get(
      `${API_URL}/recipes?_page=${_page}&_per_page=8`
    );
    const resComments = await axios.get(`${API_URL}/comments`);
    const recipes = resRecipes.data.map((recipe: newRecipesType) => {
      const comments = resComments.data?.filter(
        (comment: commentType) => comment.recipeId === recipe.id
      );
      recipe.comments = comments;
      return recipe;
    });
    return recipes;
  }