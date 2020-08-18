import React, { FunctionComponent } from 'react'
 
const Loading: FunctionComponent  = () => {

    return (
        <>
            <section className="flex items-center dark-gray justify-center pt4 f2 f1-l">
                <div className="fa-2x">
                    <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                </div>
            </section>
        </>
    )
}

export default Loading