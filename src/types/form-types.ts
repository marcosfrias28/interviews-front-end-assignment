export interface ingredientType {
  index: number;
  value: string;
}

export interface formTypes {
    name: string;
    ingredients: string[];
    instructions: string;
    cuisineId: string;
    dietId: string;
    difficultyId: string;
    image: File | null;
  }