import React, { useEffect, useContext, FC } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { INutritionContext } from '../types'
import { NewDessertInput } from "./../../__generated__/globalTypes";
import NewDessert from '../components/NewDessert'
import DessertGrid from '../components/DessertGrid'
import Header from '../components/Header'
import ControlBox from '../components/ControlBox'
import Loading from '../components/Loading'
import { NutritionContext } from '../context/NutritionContext'
import { dessertList } from './__generated__/dessertList'
import { ResetDesserts } from './__generated__/ResetDesserts'
import { CreateDessertVariables, CreateDessert } from './__generated__/CreateDessert'
import { DeleteDesserts, DeleteDessertsVariables } from './__generated__/DeleteDesserts'

const DESSERT_DETAILS = gql`
  fragment DessertDetails on Dessert {
    id
    name
    nutritionInfo {
      calories
      fat
      carbs
      protein
    }
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

const NutritionList: FC = () => {

  const {
    state,
    setModal,
    setSelections,
    setSortField,
    setSortAsc,
    setDesserts
  } = useContext<INutritionContext>(NutritionContext)
  const {
    modal,
    selections
  } = state 

  const { data, loading: dessertListLoading, error: dessertListError, refetch: dessertListRefetch } = useQuery<dessertList>(GET_DESSERTS, { fetchPolicy: 'cache-and-network'})

  const [createDessert, {loading: createDessertLoading, error: createDessertError}] = useMutation<CreateDessert, CreateDessertVariables>(CREATE_DESSERT)
  // , {
  //     update(cache, { data: { addDessert } }) {
  //       const { desserts } = cache.readQuery<any>({ query: GET_DESSERTS })
  
  //       cache.writeQuery({
  //         query: CREATE_DESSERT,
  //         data: { desserts: [addDessert, ...desserts] }
  //       })
  //     }
  //   })

  const [deleteDessert, {loading: deleteDessertsLoading, error: deleteDessertsError}] = useMutation<DeleteDesserts, DeleteDessertsVariables>(DELETE_DESSERTS)
  const [resetDessert, {loading: resetDessertLoading, error: resetDessertError}] = useMutation<ResetDesserts>(RESET_DESSERTS, {
    onCompleted: data => {
      if (data) {
        setDesserts(data.resetDesserts)
      }
    }})

  const desserts = data ? data.desserts : null;

  useEffect(() => {
    desserts && setDesserts(desserts)
  }, [desserts, setDesserts])

  const onReset = async () => {
    await resetDessert({
      variables: {}
    })
    setSelections([])
    setSortField('created')
    setSortAsc(false)
  }

  const onSubmitNewDessert = async (input: NewDessertInput) => {
    setModal(false)
    await createDessert({
      variables: {input}
      })
    dessertListRefetch();
      // .then(
      //   res => {
      //     setNewDessert(res.data.addDessert)
      //     sortDesserts()
      //   },
      //   err => {
      //     console.log(`createDessert err: ${JSON.stringify(err, null, '\t')}`)
      //   }
      // )
  }

  const onDeleteDesserts = () => {
    deleteDessert({
      variables: {ids: selections}
    })
    // .then(
    //   res => {
    //     setDeletedDesserts(res.data.deleteDesserts)
    //     sortDesserts()
    //   },
    //   err => {
    //     console.log(`deleteDessert err: ${JSON.stringify(err, null, '\t')}`)
    //   }
    // )
    setSelections([])
    dessertListRefetch()
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

  if (dessertListError || createDessertError || deleteDessertsError || resetDessertError) return <p>ERROR</p>

  const loading = dessertListLoading || resetDessertLoading || createDessertLoading || deleteDessertsLoading

  return (
    <>
        <Header onReset={onReset}></Header> 
        <div className="ph2 pv4">
          <ControlBox onAddDessert={onAddDessert} onDeleteDesserts={onDeleteDesserts} />
          {loading && (<Loading />)}
          {!loading && (<DessertGrid />)}
        </div>
    </>
  )
}

export default NutritionList