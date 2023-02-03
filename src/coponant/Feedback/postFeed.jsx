import React from 'react'

const PostFeed = ({ getUseRefValue }) => {


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

        let date = new Date()

        let body = {
            feedbackName: feedName,
            feedbackType: checkedRadio,
            feedbackMsg: feedMsg,
            feedFromWebName: window.location.href,
            whenCreated: `${date}`
        }

        // console.log(body)


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

            let call = getUseRefValue()
            // console.log(call)
            call.current?.scrollIntoView({ behavior: "smooth" })



            // // // Set localstorage for ferture ----------------->
            localStorage.setItem("FeedBackForTodoAK", "yes")

            // // // set value 0 to alReady all feeds fetched --->
            // alReadyFeedShown = 0

            // alertBoxValue = 1
            // return showAlertBox(`Successfull :- ${a.message} `, true, "Feedback Submited")

            return alert("Submited")

        }


    }


    // // // // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Clear feed form Section >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // // // Clear feed form -->
    const clearFeedDetails = () => {
        document.getElementById("feed_form").reset()
    }






    return (
        <>


            <div className="col-8 col-md-6 d-flex flex-column align-items-center  ">


                <form action="" id='feed_form' className='m-5 p-3 bg-primary border border-danger rounded '>

                    <h1 className='text-warning p-1 border border-warning border-end-0 border-start-0 rounded-3'>Feedback Form</h1>

                    <div>
                        <label htmlFor='feed_name' ><h2>Visitor Name :-</h2></label><br />
                        <input type="text" placeholder="Guest (Default)" id="feed_name" />
                    </div><br />

                    <h2 >Types of Feedback :-</h2>
                    <div id="feed_radio">
                        <input type="radio" name="feed_type" value="Feedback" id="feedback_only" defaultChecked={true}
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
                        <textarea name="feed_msg" placeholder="Nice website (Your Feedback Message)" id="feed_msg" cols="30" rows="7"></textarea>
                    </div>

                    <div className='d-flex align-items-end' id="feedBtn_div">
                        <input type="button" id="feed_submit_btn" onClick={submitFeedDetails} value="Submit" />
                        <input type="button" value="Clear" onClick={clearFeedDetails} id="clear_btn" />
                    </div>

                    <div id="progress_feed"></div>

                    <p>Give feedback to see all feedback of this website.</p>

                </form>

            </div>

        </>
    )
}

export default PostFeed