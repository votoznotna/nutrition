export interface IDessert {
    id: string,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    created: number
}

export interface INewDessertInput {
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
}

export interface IDessertDeleteInput {
    ids: string[]
}