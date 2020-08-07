import React from "react";

interface Props {
    onReset: () => void
}

const headerStyle:React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}
 
const Header = ({ onReset }: Props) => {

    return (
        <>
            <section style={headerStyle} className="ph3 f3 f2-m f1-l">
                <h6 className="mv0">
                    Nutrition List  
                </h6>
                <button onClick={onReset} className="f6-m f5-l fw6 pa2 br2 b--dark-green white bg-dark-green">
                    <i className="fa fa-refresh mr3" aria-hidden="true"> </i>
                    RESET DATA
                </button>
            </section>
        </>
    )
}

export default Header