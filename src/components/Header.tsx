import React, { FunctionComponent } from 'react'

interface IProps {
    onReset: () => void
}

// const headerStyle: React.CSSProperties = {
// }
 
const Header: FunctionComponent<IProps>  = ({ onReset }: IProps) => {

    return (
        <>
            <section className="flex items-center justify-between ph3 f2 f1-l">
                <h6 className="mv0">
                    Nutrition List  
                </h6>
                <button onClick={onReset} className="f6 f5-l fw6 pa2 br2 b--dark-green white bg-dark-green">
                    <i className="fa fa-refresh mr3" aria-hidden="true"> </i>
                    RESET DATA
                </button>
            </section>
        </>
    )
}

export default Header