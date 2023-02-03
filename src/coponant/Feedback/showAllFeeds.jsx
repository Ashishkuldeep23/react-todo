import React , { useRef } from 'react'

import done from "./done.mp3"



const ShowAllFeeds = ({getUseRefValue}) => {

    // // // useRef hook for scrool down when somthing done.
    const reftoAllFeed = useRef(null);
    const refFeedClickBtn = useRef(null)

    // // // to check network ---------->
    const network = navigator.onLine



    getUseRefValue(refFeedClickBtn)





    // // // Show all feed handler function ----->
    async function showAllFeedBack() {


        if (network === false) {
            // alertBoxValue = 1
            // return showAlertBox("Please connect with network.\nBecause network connection needed for DB call.", false)

            return alert("Please connect with network.\nBecause network connection needed for DB call.")
        }



        let prrocessAllFeed = document.getElementById("process_all_feeds")
        prrocessAllFeed.style.visibility = "visible"
        // prrocessAllFeed.style.display = "block";


        let data = await fetch("https://feedback-hzwx.onrender.com/getFeedback/smallProjectsFeed")

        let a = await data.json()


        if (a.status === false) {
            prrocessAllFeed.style.display = "hidden"
            prrocessAllFeed.style.display = "none"

            // alertBoxValue = 1
            // return showAlertBox(`Error :- ${a.message}`, false)

            return alert(a.message)

        }


        if (a.status === true) {
            // // // Process hide and already shown value ---->
            prrocessAllFeed.style.visibility = "hidden"

            // // // Temp var to store all feeds from DB -->
            let temp = ""

            if (a.data.length === 0) {

                temp = "<div class='user_feeds_are'> <h3>Not Found any Feedback</h3> <p>Give your Feedback and Become First Person</p> </div>"

            } else {

                for (let i = 0; i < a.data.length; i++) {
                    temp += `  
                    <div class="user_feeds_are">
                    <h3>Name :- ${a.data[i].feedbackName}</h3>
                    <p>Type :- ${a.data[i].feedbackType}</p>
                    <p>Count :- ${a.data.length - i} </p>
                    <p>Message:- ${a.data[i].feedbackMsg}</p>
                    <p>Reply:- ${a.data[i].reply || "Thank You!"}</p>
                    <p>Time:- ${a.data[i].whenCreated}</p>
                    </div> `
                }

            }

            // // // setting inner html to outPut div
            document.getElementById("all_feedback").innerHTML = temp
            new Audio(done).play()



            // // // After successfull fetched data scrolling window till div --->
            // // // Experiment(worked) ================>
            // // // Window scrool to output div ----->

            reftoAllFeed.current?.scrollIntoView({ behavior: "smooth" })
            // reftoAllFeed.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })


            let periviousFeedBack = localStorage.getItem("FeedBackForTodoAK")
            if (periviousFeedBack !== "yes") {
                alert("Please Give your valuable feedback for this ToDo App.\nMy apology for Alert.")
            }


        }

    }




    return (
        <>

            <div className="show_all_feeds_topmost_div col-12" >

                <div ref={refFeedClickBtn} className="show_All_FeedBack_main">
                    <h1>Click on Show Button to see all Feedbacks</h1>
                    <input type="button" value="Show All Feedbacks" onClick={showAllFeedBack} id="show_all_feed_btn" />

                    <div id="process_all_feeds"></div>

                    {/* <!-- Result div below ===> --> */}
                    <div ref={reftoAllFeed} id="all_feedback"></div>
                </div>

            </div>


        </>
    )
}

export default ShowAllFeeds