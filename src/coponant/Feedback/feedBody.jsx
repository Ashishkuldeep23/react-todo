import React ,{useState} from "react";

import PostFeed from "./postFeed"

import AboutMe from "./aboutMe"

import ShowAllFeeds from "./showAllFeeds"

// import done from "./done.mp3"


const FeedBody = () => {

    const [valuOfCall , setValueOfCall] = useState("")


    

    function getUseRefValue(value){

        setValueOfCall(value)
        console.log("Getting err but work well scroll after feedsubmit")

        // let hold = value

        return valuOfCall
    }





    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Next Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // // Check feedback is submited in past or not ---->
    // // Below is for checking previously submited feedback or not ----->


    // let periviousFeedBack = localStorage.getItem("FeedBackForTodoAK")
    // console.log(periviousFeedBack)
    // if (periviousFeedBack !== "yes" ) { 
    //     document.querySelector(".show_All_FeedBack_main").style.visibility = "hidden"
    //     console.log("I am in")
    // }

    // // // Not Working Now above --------+






    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Fetch All Feeds Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // // // Show all feeds ----->




    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< UI Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return (
        <>

            <div className='feed_body'>

                <div className='d-flex justify-content-center'>


                    <div className="container-fluide d-flex align-items-center  ">

                        <div className="row d-flex justify-content-center h-100 ">



                            {/* Main of post feed from */}
                            <PostFeed getUseRefValue={getUseRefValue} />


                            {/* Main for about me */}
                            <AboutMe />


                            {/* show all feedback div ----> */}
                            <ShowAllFeeds getUseRefValue={getUseRefValue}/>



                        </div>



                    </div>


                </div>


            </div>


        </>
    )

}



export default FeedBody