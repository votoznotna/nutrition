import React, { useEffect, useContext, FunctionComponent } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { INewDessertInput, INutritionContext } from '../types'
import NewDessert from '../components/NewDessert'
import DessertGrid from '../components/DessertGrid'
import Header from '../components/Header'
import ControlBox from '../components/ControlBox'
import { NutritionContext } from '../context/NutritionContext'

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

interface IProps {
}

const NutritionList: FunctionComponent<IProps> = () => {

  const {
    state,
    setModal,
    setSelections,
    setSortField,
    setSortAsc,
    setDesserts,
    setNewDessert,
    setDeletedDesserts,
    sortDesserts
  } = useContext<INutritionContext>(NutritionContext)
  const {
    modal,
    selections
  } = state 

  const desserts: any = useQuery(GET_DESSERTS)

  const [createDessert, newDessert] = useMutation<any>(CREATE_DESSERT, {
      update(cache, { data: { addDessert } }) {
        const { desserts } = cache.readQuery<any>({ query: GET_DESSERTS })
  
        cache.writeQuery({
          query: CREATE_DESSERT,
          data: { desserts: [addDessert, ...desserts] }
        })
      }
    })

  const [deleteDessert, deletedDessert] = useMutation<any>(DELETE_DESSERTS)
  const [resetDessert, resettedDessert] = useMutation<any>(RESET_DESSERTS)

  useEffect(() => {
    setDesserts([...((desserts && desserts.data && desserts.data.desserts) || [])])
  }, [desserts, setDesserts])

  const onReset = () => {
    resetDessert({
      variables: {}
    }).then(
      res => {
        setDesserts(res.data.resetDesserts || [])
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
          setNewDessert(res.data.addDessert)
          sortDesserts()
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
        setDeletedDesserts(res.data.deleteDesserts)
        sortDesserts()
      },
      err => {
        console.log(`deleteDessert err: ${JSON.stringify(err, null, '\t')}`)
      }
    )
    setSelections([])
  }

  const onAddDessert = () => {
    setModal(true)
  }

  if (modal) {
    return (
      <div className="center">
          <NewDessert onAddDessert={onSubmitNewDessert} onCancel={() => setModal(false)} />
      </div>
    )
  }   

  if (desserts.error || newDessert.error || deletedDessert.error || resettedDessert.error) return <p>ERROR</p>

  return (
    <>
        <Header onReset={onReset}></Header> 
        <div className="ph2 pv4">
          <ControlBox onAddDessert={onAddDessert} onDeleteDesserts={onDeleteDesserts} />
          <DessertGrid  />
        </div>
    </>
  )
}

export default NutritionList