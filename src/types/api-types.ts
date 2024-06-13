export type filterType = "q" | "cuisineId" | "difficultyId" | "dietId";

export interface dietType {
    id: string
    name: string
}

export interface difficultyType {
    id: string
    name: string
}

export interface cuisineType {
    id: string
    name: string
}

export interface recipeType {
    id: string
    name: string
    ingredients: string
    instructions: string
    cuisineId: string
    dietId: string
    difficultyId: string
    image: string
 }