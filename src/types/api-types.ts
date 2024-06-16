export type filterSearchType = "q" | "cuisineId" | "difficultyId" | "dietId";

export interface filterType {
  q: string;
  cuisineId: string;
  difficultyId: string;
  dietId: string;
}

export interface dietType {
  id: string;
  name: string;
}

export interface difficultyType {
  id: string;
  name: string;
}

export interface cuisineType {
  id: string;
  name: string;
}

export type ingredientType = string;

export interface commentType {
  id: string;
  recipeId: string;
  comment: string;
  rating: number;
  date: Date;
}

export interface newRecipesType {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  cuisineId: string;
  dietId: string;
  difficultyId: string;
  image: string;
  comments: commentType[],
}
