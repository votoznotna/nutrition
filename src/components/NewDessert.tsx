import React, { useRef, useState, useEffect, FC } from 'react'
import { INewDessertInput } from '../types'

interface IProps {
    onAddDessert: (input: INewDessertInput) => void
    onCancel: () => void
}

const inputClasses = 'pa2 input-reset black ba bg-transparent w-100'
const errorClass = 'validation--error'
  
const NewDessert: FC<IProps> = ({ onAddDessert, onCancel }: IProps) => {

    const [formValid, setFormValid] = useState(false)
    const nameRef: any = useRef<HTMLInputElement>(null)
    const caloriesRef: any = useRef<HTMLInputElement>(null)
    const fatRef: any = useRef<HTMLInputElement>(null)
    const carbsRef: any = useRef<HTMLInputElement>(null)
    const proteinRef: any = useRef<HTMLInputElement>(null)

    const validNumberRegex = RegExp(/^[0-9]*$/)
   
    useEffect(() => {
        nameRef.current.focus()
    }, [])

    const onSubmit = (e: any) => {
        e.preventDefault()

        const submitValue: INewDessertInput = {
            name: nameRef.current.value,
            calories: caloriesRef.current.value,
            fat: fatRef.current.value,
            carbs: carbsRef.current.value,
            protein: proteinRef.current.value
        }

        nameRef.current.classList.remove(errorClass)
        if(!(submitValue.name.toString().replace(/(^\s+|\s+$)/g,''))) {
            nameRef.current.classList.add(errorClass)
            return
        }

        caloriesRef.current.classList.remove(errorClass)
        if(!(submitValue.calories.toString().replace(/(^\s+|\s+$)/g,'') && validNumberRegex.test(submitValue.calories.toString()))) {
            caloriesRef.current.classList.add(errorClass)
            return
        }
        submitValue.calories = +submitValue.calories

        fatRef.current.classList.remove(errorClass)
        if(!(submitValue.fat.toString().replace(/(^\s+|\s+$)/g,'') && validNumberRegex.test(submitValue.fat.toString()))) {
            fatRef.current.classList.add(errorClass)
            return
        }
        submitValue.fat = +submitValue.fat

        carbsRef.current.classList.remove(errorClass)
        if(!(submitValue.carbs.toString().replace(/(^\s+|\s+$)/g,'') && validNumberRegex.test(submitValue.carbs.toString()))) {
            carbsRef.current.classList.add(errorClass)
            return
        }
        submitValue.carbs = +submitValue.carbs

        proteinRef.current.classList.remove(errorClass)
        if(!(submitValue.protein.toString().replace(/(^\s+|\s+$)/g,'') && validNumberRegex.test(submitValue.protein.toString()))) {
            proteinRef.current.classList.add(errorClass)
            return
        }
        submitValue.protein = +submitValue.protein

        setFormValid(true)
        onAddDessert(submitValue)
        onCancel()
    }

    return (
        <>
            <main className="pa4 flex items-center justify-center black-80">
                <section className="flex items-center justify-center b--white bg-white ma2 pa4">
                    <form className="measure bw4 b--white bg-white" onSubmit={onSubmit} noValidate>
                    {!formValid && (<div  className="bg-dark-yellow white flex items-center justify-center pa2">
                        <i className="fa fa-exclamation-triangle mr2" aria-hidden="true"></i>
                        <label className="fw6">Please fill all details before you submit</label>
                    </div>)}
                    <div className="mt3">
                        <label className="db fw6 lh-copy f8" htmlFor="name">Dessert Name*</label>
                        <input ref={nameRef} required className={inputClasses} type="text" name="name"  id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f8" htmlFor="calories">Calories*</label>
                        <input ref={caloriesRef} required className={inputClasses}  type="text" name="calories"  id="calories" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f8" htmlFor="fat">Fat(g)*</label>
                        <input ref={fatRef} required className={inputClasses}  type="text" name="fat"  id="fat" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f8" htmlFor="carbs">Carbs(g)*</label>
                        <input ref={carbsRef} required className={inputClasses}  type="text" name="carbs"  id="carbs" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f8" htmlFor="protein">Protein(g)*</label>
                        <input ref={proteinRef} required className={inputClasses}  type="text" name="protein"  id="protein" />
                    </div>
                    <div className="lh-copy mt3 flex items-center justify-center">
                    <button onClick={onCancel} className="f6 b--near-white fw6 ph3 pv2 green mr3 bg-white">
                                <i className="fa fa-times mr3" aria-hidden="true"> </i>
                                CANCEL
                    </button>
                    <button onClick={onSubmit} type="submit" className="f6 b--green fw6 ph3 pv2 white mr2 bg-green">
                                <i className="fa fa-check mr3" aria-hidden="true"> </i>
                                SUBMIT
                    </button>
                    </div>
                </form>
                </section>
            </main>
        </>
    )
}

export default NewDessert