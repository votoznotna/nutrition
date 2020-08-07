import React, { useState, useEffect, useRef } from "react";
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { IDessert, INewDessertInput } from '../types';
import DessertRow from '../components/DessertRow'
import NewDessert from '../components/NewDessert'
import Header from '../components/Header'
import { ControlBox } from "../components/ControlBox";

const DESSERT_DETAILS = gql`
  fragment DessertDetails on Dessert {
    id
    name
    calories
    fat
    carbs
    protein
    created
  }
`
const GET_DESSERTS = gql`
  query dessertList {
    desserts {
      ...DessertDetails
    }
  }
  ${DESSERT_DETAILS}
`
const DELETE_DESSERTS = gql`
mutation DeleteDesserts($ids: [String!]!) {
  deleteDesserts(ids: $ids)
}
`

const RESET_DESSERTS = gql`
mutation ResetDesserts {
  resetDesserts {
    ...DessertDetails
  }
}
${DESSERT_DETAILS}
`

const CREATE_DESSERT = gql`
  mutation CreateDessert($input: NewDessertInput!) {
    addDessert(input: $input) {
      ...DessertDetails
    }
  }
  ${DESSERT_DETAILS}
`
  
const NutritionList = () => {

    const [modal, setModal] = useState<boolean>(false)
    const [selections, setSelections] = useState<string[]>([])
    const [data, setData] = useState<any>([])
    const [sortField, setSortField] = useState<string>('created')
    const [sortAsc, setSortAsc] = useState<boolean>(false)
    const allDessertsSelectorRef:any = useRef<HTMLInputElement>(null)
    const desserts: any = useQuery(GET_DESSERTS)

    const thClassNames = 'tc fw6 bb b--black-20 pv3 bg-white'
    const thSortableClassNames = `cursor-pointer sortable-column ${thClassNames}`
    const thFirstClassNames = `pl3 ${thClassNames}`
    const thSortIconsClassNames = 'fa fa-sort ml1 v-mid'

    const [createDessert, newDessert] = useMutation<any>(CREATE_DESSERT, {
        update(cache, { data: { addDessert } }) {
          const { desserts } = cache.readQuery<any>({ query: GET_DESSERTS })
    
          cache.writeQuery({
            query: CREATE_DESSERT,
            data: { desserts: [addDessert, ...desserts] }
          })
        }
      })

    const [deleteDessert] = useMutation<any>(DELETE_DESSERTS)
    const [resetDessert] = useMutation<any>(RESET_DESSERTS)

    useEffect(() => {
      // eslint-disable-next-line no-mixed-operators
      setData([...(desserts && desserts.data && desserts.data.desserts || [])])
    }, [desserts]);

    const onReset = () => {
      resetDessert({
        variables: {}
      }).then(
        res => {
          // eslint-disable-next-line no-mixed-operators
          setData(res.data.resetDesserts || [])
        },
        err => {
          console.log(`resetDesserts err: ${JSON.stringify(err, null, '\t')}`)
        }
      )
      setSelections([])
      setSortField('created')
      setSortAsc(false)
    }

    const onSubmitNewDessert = (input: INewDessertInput): void => {
      setModal(false)
      createDessert({
        variables: {input}
        }).then(
          res => {
            // eslint-disable-next-line no-mixed-operators
            setData((prev: any) => [...prev, res.data.addDessert])
            applyCurrentSort()
          },
          err => {
            console.log(`createDessert err: ${JSON.stringify(err, null, '\t')}`)
          }
        )
    }
  
    const onDeleteDesserts = () => {
      deleteDessert({
        variables: {ids: selections}
      }).then(
        res => {
          // eslint-disable-next-line no-mixed-operators
          const newData = data.filter((item: IDessert) => res.data.deleteDesserts.indexOf(item.id) === -1 )
          setData(newData)
          applyCurrentSort()
        },
        err => {
          console.log(`deleteDessert err: ${JSON.stringify(err, null, '\t')}`)
        }
      )
      setSelections([])
    }

    const onAddDessert = () => {
      setModal(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const applyCurrentSort = () => {
      setData((prev: any[]) => [...prev.sort((a, b) => {
        const aValue = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField]
        const bValue = typeof a[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField]
        if(sortAsc) {
          return aValue > bValue ? 1 : -1
        }
        return aValue > bValue ? -1 : 1
      })])
    }

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
      let target = null;

      if(e.target.classList.contains('sortable-column')) {
        target = e.target; 
      } else if(e.target.parentElement.classList.contains('sortable-column')) {
        target = e.target.parentElement;
      }
      if(target) {
          setSortField(target.getAttribute('id'))
          setSortAsc(prev => !prev)
      }
    }

    useEffect(() => {
      if(selections.length !== data.length && allDessertsSelectorRef.current.checked) {
        allDessertsSelectorRef.current.checked = false
      } 
      if(selections.length && selections.length === data.length && !allDessertsSelectorRef.current.checked) {
        allDessertsSelectorRef.current.checked = true
      } 
    }, [selections]);


    useEffect(() => {
      applyCurrentSort()
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    }, [sortField, sortAsc]);

  if (modal) {
      return (
        <div className="center">
            <NewDessert onAddDessert={onSubmitNewDessert} onCancel={() => setModal(false)} />
        </div>
      )
    }   

    if (desserts.error || newDessert.error) return <p>ERROR</p>

    return (
        <>
            <Header onReset={onReset}></Header> 
            <div className="ph2 pv4">
            <ControlBox selections={selections} onAddDessert={onAddDessert} onDeleteDesserts={onDeleteDesserts} />
            <div className="overflow-auto">
                <table data-testid="nutrition-table" className="f6-m f8-l mw-100 w-100">
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
                      <DessertRow key={`dessert_row_6${dessert.id}`} dessert={dessert} selections={selections} setSelections={setSelections} />
                  ))}
                </tbody>
                </table>
            </div>
            </div>
        </>
    )
  }

  export default NutritionList;