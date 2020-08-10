import React, { useReducer, createContext, useCallback, FunctionComponent } from 'react'
import { IDessert, INutritionState, INutritionContext } from '../types'

const defaultNutritionState: INutritionState = {
    modal: false,
    selections: [],
    data: [],
    sortField: 'created',
    sortAsc: false,
}

const defaultNutritionContextValue: INutritionContext = {
  state: defaultNutritionState,
  setModal: (value: boolean) => {},
  setSelections: (value: string[]) => {},
  setSortField: (value: string) => {},
  setSortAsc: (value: boolean) => {},
  setDesserts: (value: IDessert[]) => {},
  setNewDessert: (value: IDessert) => {},
  setDeletedDesserts: (value: string[]) => {},
  sortDesserts: () => {}
}

export const NutritionContext = createContext<INutritionContext>(defaultNutritionContextValue)

const SET_MODAL = 'SET_MODAL'
const SET_SELECTIONS = 'SET_SELECTIONS'
const SET_DESSERTS = 'SET_DESSERTS'
const NEW_DESSERT = 'NEW_DESSERT'
const DELETE_DESSERTS = 'DELETE_DESSERTS'
const SORT_DESSERTS = 'SORT_DESSERTS'
const SET_SORT_FIELD = 'SET_SORT_FIELD'
const SET_SORT_ASC = 'SET_SORT_ASC'

const reducer = (state = defaultNutritionState, action: any) => {
  if (action.type === SET_MODAL) {
    return {...state, ...{modal: action.payload}}
  }

  if (action.type === SET_SELECTIONS) {
    return {...state, ...{selections: action.payload}}
  }

  if (action.type === SET_DESSERTS) {
    return {...state, ...{data: action.payload}}
  }

  if (action.type === SET_SORT_FIELD) {
    return {...state, ...{sortField: action.payload}}
  }

  if (action.type === SET_SORT_ASC) {
    return {...state, ...{sortAsc: action.payload}}
  }

  if (action.type === NEW_DESSERT) {
    return {...state, ...{data: [...state.data, action.payload]}}
  }

  if (action.type === DELETE_DESSERTS) {
    const afterDeleteData = state.data.filter((item: IDessert) => action.payload.indexOf(item.id) === -1 )
    return {...state, ...{data: afterDeleteData}}
  }

  if (action.type === SORT_DESSERTS) {
    const sortedData =  state.data.sort((a:any, b:any) => {
        let aValue = a[state.sortField] || a.nutritionInfo[state.sortField]
        let bValue = b[state.sortField] || b.nutritionInfo[state.sortField]
        aValue = typeof aValue === 'string' ? aValue.toLowerCase() : aValue
        bValue = typeof bValue === 'string' ? bValue.toLowerCase() : bValue
        if(state.sortAsc) {
          return aValue > bValue ? 1 : -1
        }
        return aValue > bValue ? -1 : 1
      })
    return {...state, ...{data: sortedData}}
  }

  return state
}

type IProps = {
}

const NutritionProvider: FunctionComponent<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultNutritionState)

  const setModal = useCallback(value => {
      dispatch({
        type: SET_MODAL, 
        payload: value
        })
    },
    [dispatch]
  )

  const setSelections = useCallback(value => {
        dispatch({
            type: SET_SELECTIONS, 
            payload: value
        })
        },
        [dispatch]
    )

    const setSortField = useCallback(value => {
        dispatch({
          type: SET_SORT_FIELD, 
          payload: value
          })
        },
        [dispatch]
    )

    const setSortAsc = useCallback(value => {
        dispatch({
            type: SET_SORT_ASC, 
            payload: value
            })
        },
        [dispatch]
    )

    const setDesserts = useCallback(value => {
        dispatch({
            type: SET_DESSERTS, 
            payload: value
            })
        },
        [dispatch]
    )

    const setNewDessert = useCallback(value => {
        dispatch({
            type: NEW_DESSERT, 
            payload: value
            })
        },
        [dispatch]
    )

    const setDeletedDesserts = useCallback(value => {
        dispatch({
            type: DELETE_DESSERTS, 
            payload: value
            })
        },
        [dispatch]
    )

    const sortDesserts = useCallback(() => {
        dispatch({
            type: SORT_DESSERTS
            })
        },
        [dispatch]
    )  

  return (
    <NutritionContext.Provider
      value={{
        state,
        setModal,
        setSelections,
        setSortField,
        setSortAsc,
        setDesserts,
        setNewDessert,
        setDeletedDesserts,
        sortDesserts
      }}
    >
      {children}
    </NutritionContext.Provider>
  )
}

export default NutritionProvider