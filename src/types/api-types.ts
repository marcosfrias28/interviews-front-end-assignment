export type filterSearchType = "q" | "cuisineId" | "difficultyId" | "dietId";

export interface filterType {
    cuisineId: string
    difficultyId: string
    dietId: string
}

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
    ingredients: Array<string>
    instructions: string
    cuisineId: string
    dietId: string
    difficultyId: string
    image: string
 }