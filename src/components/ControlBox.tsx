import React from "react";

interface Props {
    onAddDessert: () => void,
    onDeleteDesserts: () => void
    selections: string[]
}
 
const buttonDisableClassNames = 'f6-m f5-l fw6 b--disalbe-light-pink pv2 bg-disable-light-pink'

const buttonEnableClassNames = 'f6-m f5-l fw6 b--white pv2 pink bg-white'

const sectionStyle = {

}
  
export const ControlBox = ({ onAddDessert,  onDeleteDesserts, selections }: Props) => {

    return (
        <>
            <section style={sectionStyle} className="flex items-center justify-between mb0 w100 mw100 pa3 bg-enable-light-pink">
                <div>
                    <label className="dark-pink f6-m f8-l fw8">{`${selections.length} selected`}</label>
                </div>
                <div>
                    <button onClick={onAddDessert} className="f6-m f5-l b--white fw6 ph3 pv2 green mr2 bg-white">
                                <i className="fa fa-plus mr3" aria-hidden="true"> </i>
                                ADD NEW
                    </button>
                    <button disabled={!selections.length} onClick={onDeleteDesserts} className={selections.length ? buttonEnableClassNames : buttonDisableClassNames }>
                                <i className="fa fa-trash-o mr3" aria-hidden="true"> </i>
                                DELETE
                    </button>
                </div>
            </section>
        </>
    )
}