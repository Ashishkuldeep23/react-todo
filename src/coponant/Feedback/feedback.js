

import React , {useRef} from 'react'
import "./style.css"




const Feedback = () => {

    // // // Getting full url ---->
    // console.log(window.location.href)

    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< some refring divs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const reftoAllFeed = useRef(null);
    const refFeedClickBtn = useRef(null)

    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Post new Feed Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    const network = navigator.onLine
    

    // // // Submit new feed back --->

    async function submitFeedDetails() {


        if (network === false) {
            // alertBoxValue = 1
            // return showAlertBox("Please connect with network.\nBecause network connection needed for DB call.", false)

            return alert("Please connect with network.\nBecause network connection needed for DB call.")

        }

        let progress = document.getElementById("progress_feed")
        progress.style.width = "0px"
        progress.style.visibility = "visible"

        let feedName = document.getElementById("feed_name").value.trim()

        let feedMsg = document.getElementById("feed_msg").value.trim()


        let checkedRadio = ""
        let radio = document.getElementsByName("feed_type")
        for (let i of radio) {
            if (i.checked) {
                checkedRadio = i.value
            }
        }

        if (!feedName) {
            feedName = "Guest"
        }

        if (!feedMsg) {
            progress.style.visibility = "hidden"

            // alertBoxValue = 1
            // return showAlertBox("Feedback message should be given.", false)


            return alert("Feedback message should be given.")

        }


        let body = {
            feedbackName: feedName,
            feedbackType: checkedRadio,
            feedbackMsg: feedMsg,
            feedFromWebName : window.location.href
        }


        let option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        let data = await fetch("https://feedback-hzwx.onrender.com/newFeedback/smallProjectsFeed", option)

        let a = await data.json()

        if (a.status === false) {
            progress.style.display = "hidden"

            // alertBoxValue = 1
            // return showAlertBox(`Error :- ${a.message}`, false)

            return alert(a.message)

        }

        if (a.status === true) {
            // // // Form reset and process hide
            progress.style.visibility = "hidden"
            document.getElementById("feed_form").reset()

            // // // Showing div that contan all feeds ----------->
            let allFeedMainDiv = document.querySelector(".show_All_FeedBack_main")
            allFeedMainDiv.style.display = "flex"

            // // // Scroll to hidden div ---->

            refFeedClickBtn.current?.scrollIntoView({ behavior: "smooth"})
  


            // // // Set localstorage for ferture ----------------->
            localStorage.setItem("FeedBackForTodoAk", "1")

            // // // set value 0 to alReady all feeds fetched --->
            // alReadyFeedShown = 0

            // alertBoxValue = 1
            // return showAlertBox(`Successfull :- ${a.message} `, true, "Feedback Submited")

            return alert("Submited")

        }


    }



    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Next Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // // // Clear feed form -->
    const clearFeedDetails = () => {
        document.getElementById("feed_form").reset()
    }





    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Clear feed form Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // // // Check feedback is submited in past or not ---->
    // // // Below is for checking previously submited feedback or not ----->


    // let periviousFeedBack = localStorage.getItem("FeedBackForTodoAk")
    // // console.log(periviousFeedBack)
    // if (periviousFeedBack) {
    //     document.querySelector(".show_All_FeedBack_main").style.display = "flex"
    // }


    // // // Not Working Now above --------+






    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Fetch All Feeds Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // // // Show all feeds ----->
    
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

            // // // setting inner html to outPut div
            document.getElementById("all_feedback").innerHTML = temp


            // alertBoxValue = 1
            // return showAlertBox(`Successfull :- ${a.message} `, true, "All Feedback fetched")
            // return alert(a.message)


            // // // After successfull fetched data scrolling window till div --->
            // // // Experiment(worked) ================>
            // // // Window scrool to output div ----->
            
            reftoAllFeed.current?.scrollIntoView({ behavior: "smooth"})
            // reftoAllFeed.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })


        }

    }






    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< UI Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



    return (
        <>

          

            <div className='feedback_main'>

                <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Feedback Section
                </a>

                {/* className="collapse"  :::: add this in bellow div */}

                <div id="collapseExample" className="collapse">
                    <div className="card card-body p-0 bg-secondary ">


                        <div className='feed_body'>

                            <div className='d-flex justify-content-center'>


                                <div className="container-fluide d-flex align-items-center  ">

                                    <div className="row d-flex justify-content-center h-75 ">

                                        <div className="col-10 col-md-6 d-flex flex-column align-items-center  ">



                                            <form action="" id='feed_form' className='m-5 p-3 bg-primary border border-danger rounded'>

                                                <div>
                                                    <label htmlFor='feed_name' ><h2>Visitor Name :-</h2></label><br />
                                                    <input type="text" placeholder="Guest (Default)" id="feed_name" />
                                                </div><br />

                                                <div id="feed_radio">
                                                    <h2>Types of Feedback :-</h2>
                                                    <input type="radio" name="feed_type" value="Feedback" id="feedback_only"
                                                        /><label htmlFor='feedback_only' >Feedback</label><br />

                                                    <input type="radio" name="feed_type" value="Suggestion" id="Suggestion" /><label
                                                        htmlFor='Suggestion'>Suggestion</label><br />

                                                    <input type="radio" name="feed_type" value="Advice" id="advice" /><label
                                                        htmlFor='advice'>Advice</label> <br />

                                                    <input type="radio" name="feed_type" value="Bug" id="bug" /><label
                                                        htmlFor='bug'>Bug</label> <br />

                                                    <input type="radio" name="feed_type" value="Bad Message" id="criticize" /><label
                                                       htmlFor='criticize' >Don't Like(Message)</label>

                                                </div>

                                                <div><br />
                                                    <label htmlFor="feed_msg" ><h2>Feedback Message :-</h2></label> <br />
                                                    <textarea name="feed_msg" placeholder="Nice website (Your Feedback Message)" id="feed_msg" cols="35" rows="7"></textarea>
                                                </div>

                                                <div>
                                                    <input type="button" id="feed_submit_btn" onClick={submitFeedDetails} value="Submit" />
                                                    <input type="button" value="Clear" onClick={clearFeedDetails} className="clear_btn" />
                                                </div>

                                                <div id="progress_feed"></div>

                                                <p>Give feedback to see all feedback of this website.</p>

                                            </form>




                                        </div>



                                        <div className="col-10 col-md-6  d-flex flex-column align-items-center justify-content-center right_content">

                                            <div className='row '>


                                                <div className="col-12 col-md-8 bg-success m-auto border border-bottom-0 border-danger rounded">


                                                    <div className=' d-flex flex-column align-items-center m-auto text-white'>

                                                        <img src="https://i.pinimg.com/564x/72/6e/92/726e92a0ef5a07e46e0403ae36c0b228.jpg" id="about_img" alt="Ashish Pic" />

                                                        <h1>Ashish Kuldeep</h1>

                                                        <div>

                                                            <a href="https://www.linkedin.com/in/ashish-kuldeep-09b96018b" ><img src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Linkedin2_svg-512.png" className="logos" alt="Linkedin" />
                                                            </a>

                                                            <a href="https://github.com/Ashishkuldeep23" ><img src="https://cdn3.iconfinder.com/data/icons/social-media-2253/25/Group-512.png" className="logos" alt="Github" /></a>

                                                            <a href="https://mobile.twitter.com/ashishkuldeep23" ><img src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Twitter5_svg-512.png" className="logos" alt="Tiwtter" /></a>

                                                            <a href="https://www.youtube.com/"  rel="noopener" ><img src="https://cdn1.iconfinder.com/data/icons/social-media-rounded-corners/512/Rounded_Youtube3_svg-512.png" className="logos" alt="Youtube" /></a>
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className=" bg-success text-center col-12 col-md-8 m-auto border border-warning border-top-0 rounded text-white">
                                                    <h4>I am learning web development.</h4>
                                                    <h4>I am fallowing MERN Stack</h4>
                                                    <h4>Fallow me on social media</h4>
                                                </div>

                                            </div>



                                        </div>


                                        {/* show all feedback div ----> */}

                                        <div className="show_all_feeds_topmost_div col-12">

                                            <div ref={refFeedClickBtn} className="show_All_FeedBack_main">
                                                <h1>Click on Show Button to see all Feedbacks</h1>
                                                <input type="button" value="Show All Feedbacks" onClick={showAllFeedBack} id="show_all_feed_btn" />

                                                <div id="process_all_feeds"></div>

                                                {/* <!-- Result div below ===> --> */}
                                                <div ref={reftoAllFeed} id="all_feedback"></div>
                                            </div>

                                        </div>



                                    </div>



                                </div>


                            </div>


                        </div>




                        {/* collapse cancel btn ------> (again) */}
                        <div className='d-flex justify-content-center '>
                            <a className="btn btn-primary " data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                Feedback Section
                            </a>
                        </div>


                    </div>


                </div>
            </div>

        </>
    )
}

export default Feedback