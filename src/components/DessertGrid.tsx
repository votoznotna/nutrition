import React, { useEffect, useRef, useContext, FunctionComponent } from "react"
import { IDessert, INutritionContext } from '../types'
import DessertRow from './DessertRow'
import { NutritionContext } from '../context/NutritionContext'

interface IProps {
    // setSelections:  (value: string[] | ((prevVar: string[]) => string[])) => void
}
  
const thClassNames = 'tc fw6 bb b--black-20 pv3 bg-white'
const thSortableClassNames = `cursor-pointer sortable-column ${thClassNames}`
const thFirstClassNames = `pl3 ${thClassNames}`
const thSortIconsClassNames = 'fa fa-sort ml1 v-mid'

const DessertGrid: FunctionComponent<IProps> = () => {
    const {
        state,
        setSelections,
        setSortField,
        setSortAsc,
        sortDesserts
      } = useContext<INutritionContext>(NutritionContext)
      const {
        selections,
        data,
        sortField,
        sortAsc
      } = state 
      const allDessertsSelectorRef:any = useRef<HTMLInputElement>(null)
  
      const allRowsSelect = () => {
        if(allDessertsSelectorRef.current.checked) {
          data.forEach((item: IDessert) => {
            const checkInputElement:any = document.getElementById(item.id)
            if(checkInputElement) {
              checkInputElement.checked = true
            } 
          })
          setSelections(data && data.map((item: IDessert) => item.id))
        } else {
          data.forEach((item: IDessert) => {
            const checkInputElement:any = document.getElementById(item.id)
            if(checkInputElement) {
              checkInputElement.checked = false
            } 
          })
          setSelections([])   
        }
      }
  
      const sortByField = (e: any) => {
        let target = null
  
        if(e.target.classList.contains('sortable-column')) {
          target = e.target 
        } else if(e.target.parentElement.classList.contains('sortable-column')) {
          target = e.target.parentElement
        }
        if(target) {
            setSortField(target.getAttribute('id'))
            setSortAsc(!sortAsc)
        }
      }
  
  useEffect(() => {
    if(selections.length !== data.length && allDessertsSelectorRef.current.checked) {
      allDessertsSelectorRef.current.checked = false
    } 
    if(selections.length && selections.length === data.length && !allDessertsSelectorRef.current.checked) {
      allDessertsSelectorRef.current.checked = true
    } 
  }, [data.length, selections])


  useEffect(() => {
    sortDesserts()
  }, [sortField, sortAsc, sortDesserts])

  return (
      <>
          <div className="overflow-auto">
              <table data-testid="nutrition-table" className="f6 f5-l mw-100 w-100">
              <thead onClick={sortByField}>
                  <tr>
                  <th className={thFirstClassNames}>
                      <input className="pv3 bb b--black-20 v-mid" ref={allDessertsSelectorRef} onChange={allRowsSelect} type="checkbox" id="ids" key="ids" /> 
                  </th>
                  <th className={thSortableClassNames} data-testid="name" id="name">Dessert (100g serving)
                    <i className={thSortIconsClassNames} aria-hidden="true"></i>
                  </th>
                  <th className={thSortableClassNames} id="calories">Calories
                    <i className={thSortIconsClassNames} aria-hidden="true"></i>
                  </th>
                  <th className={thSortableClassNames} id="fat">Fat (g)
                    <i className={thSortIconsClassNames} aria-hidden="true"></i>
                  </th>
                  <th className={thSortableClassNames} id="carbs">Carbs (g)
                    <i className={thSortIconsClassNames} aria-hidden="true"></i>
                  </th>
                  <th className={thSortableClassNames} id="protein">Protein (g)
                    <i className={thSortIconsClassNames} aria-hidden="true"></i>
                  </th>
                  </tr>
              </thead>
              <tbody className="bg-double-light-gray lh-copy">
                {data && data.map((dessert: IDessert) => (
                    <DessertRow key={`dessert_row_6${dessert.id}`} dessert={dessert} />
                ))}
              </tbody>
              </table>
          </div>
      </>
    )
  }

  export default DessertGrid