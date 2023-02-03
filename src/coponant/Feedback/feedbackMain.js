

import React from 'react'
import "./style.css"


import FeedBody from "./feedBody"

const Feedback = () => {





    


    return (
        <>



            <div className='feedback_main' >

                <a className="btn btn-primary bg-success" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Open Feedback Section
                </a>

                {/* className="collapse"  :::: add this in bellow div (For visible all time) */}

                <div id="collapseExample" className="collapse">

                    <div className="card card-body p-0 bg-dark ">



                        {/* Feed body component */}

                        <FeedBody />


                        {/* collapse cancel btn ------> (again) */}
                        <div className='d-flex justify-content-center '>
                            <a className="btn btn-primary bg-danger " data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                Close Feedback Section
                            </a>
                        </div>


                    </div>


                </div>
            </div>

        </>
    )
}

export default Feedback