import React, {useEffect, useRef} from "react";
import { IDessert } from '../types';

interface Props {
    dessert: IDessert
    selections: string[]
    setSelections:  (value: string[] | ((prevVar: string[]) => string[])) => void;
}

const tdClassNames = 'tc fw6 pv3 bb b--black-20';
const tdFirstClassNames = `pl3 ${tdClassNames}`
  
const DessertRow = ({ dessert, selections, setSelections }: Props) => {
    const selectionRowRef: any = useRef<HTMLInputElement>(null)
  
    const rowSelect = () => {
        const target = selectionRowRef.current
        const checked = !target.checked;
        const id = target.getAttribute('id');
        target.checked = checked
        if(checked) {
            setSelections(prev => prev.filter((item: string) => item !== id))
        } else {
            setSelections(prev => [...prev, id])
        }
        target.checked = !target.checked
    }
 
    useEffect(() => {
        const dessertId = selectionRowRef.current.getAttribute('id');
        if(selections.indexOf(dessertId) === -1 &&
            selectionRowRef.current.checked){
                selectionRowRef.current.checked = false;
        } else if (selections.indexOf(dessertId) !== -1 &&
                     !selectionRowRef.current.checked){
                    selectionRowRef.current.checked = true;
        } 
      }, [selections]);

    return (
        <>
            <tr key={`tr_${dessert.id}`} >
                <td key={`td_${dessert.id}`} className={tdFirstClassNames}>
                    <input ref={selectionRowRef} className="v-mid" type="checkbox" onChange={rowSelect} id={dessert.id} key={dessert.id} />
                </td>
                <td key={`td_name_${dessert.id}`}  className={tdClassNames}>{dessert.name}</td>
                <td key={`td_calories_${dessert.id}`} className={tdClassNames}>{dessert.calories}</td>
                <td key={`td_fat_${dessert.id}`} className={tdClassNames}>{dessert.fat}</td>
                <td key={`td_carbs_${dessert.id}`} className={tdClassNames}>{dessert.carbs}</td>
                <td key={`td_protein_${dessert.id}`} className={tdClassNames}>{dessert.protein}</td>
            </tr>
        </>
    )
  }

  export default DessertRow;