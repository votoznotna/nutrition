import { dessertList_desserts as IDessert } from '../pages/__generated__/dessertList'


export interface INutritionInfo {
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
}

// export interface IDessert {
//     id: string,
//     name: string,
//     nutritionInfo: INutritionInfo,
//     created: number
// }

export interface INewDessertInput {
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
}

export interface INutritionState {
    modal: boolean,
    selections: string[],
    data: IDessert[],
    sortField: string,
    sortAsc: boolean
}
export interface INutritionContext {
    state: INutritionState,
    setModal: (value: boolean) => void,
    setSelections: (value: string[]) => void,
    setSortField: (value: string) => void,
    setSortAsc: (value: boolean) => void,
    setDesserts: (value: IDessert[]) => void,
    setNewDessert: (value: IDessert) => void,
    setDeletedDesserts: (value: string[]) => void,
    sortDesserts: () => void
}