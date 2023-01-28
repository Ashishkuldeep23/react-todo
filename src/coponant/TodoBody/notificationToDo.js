import React, { useState } from 'react'
import "./style.css"

const NotificationToDo = () => {

    const [notiDate, setNotiDate] = useState("Date")



    // // // Main notification code here ---------------------------->


    /**
    * checks if Push notification and service workers are supported by your browser
    */
    function isPushNotificationSupported() {
        return "serviceWorker" in navigator && "PushManager" in window;
    }



    /**
     * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
     */
    function initializePushNotifications() {
        // request user grant to show notification
        return Notification.requestPermission(function (result) {
            return result;
        });
    }



    /**
     * This is Actuall function to send notification ---->
     * At very first checking how many tasks are present in localStorage to send in notification.
     * After getting all tsks in form of string then convert into actuall data.
     * Some if conditon is also present if not getting any task in localStorage.
     * Inside if condition doing 3 main this remove notifiction from local storage and show input div and in last alert box.
     * After setting all tasks run all loop to make array of all tasks.
     * And i last a setTimeout for given hour.
     * Inside setTimeou creating notification with tasks and title.
     * And then calling main funtion of seviceWorker to show notification.
     * At last removing notification from localStorage and Showing input div by calling show div function with true. 
     */
    async function sendNotification(hour) {

        // // Give time in seconds

        // // // Getting items from localhost  ---->
        let tasks = localStorage.getItem('myTodoList')
        if(!tasks){
            localStorage.removeItem("NotificationAt")
            showAndHideImpNotification(false)
            return alert("No tasks found.\nFirst create some task and then get Notification of that.")
        }

        let actualArrOfTasks = JSON.parse(tasks)
        // console.log(actualArrOfTasks[0].name)
        let lengthOfArrOfTasks = actualArrOfTasks.length

        if(lengthOfArrOfTasks === 0){
            localStorage.removeItem("NotificationAt")
            showAndHideImpNotification(false)
            return alert("No tasks found.\nFirst create some task and then get Notification of taht.")
        }

        let showTasksInNotification = ""
        for (let i = 0; i < lengthOfArrOfTasks; i++) {
            showTasksInNotification += actualArrOfTasks[i].name + ", "
        }

        // console.log(showTasksInNotification)


        setTimeout(() => {

            const text = `Pending tasks are :- [ ${showTasksInNotification} ]\nGive your feedback(In feedback section).\nThank You😊`;
            const title = "ToDo Notification!";
            const options = {
                body: text,
                vibrate: [200, 100, 200],
                // tag: "new-product",
                // actions: [{ action: "Detail", title: "View",  }]
            };

            navigator.serviceWorker.ready.then(function (serviceWorker) {
                serviceWorker.showNotification(title, options);
            });

            localStorage.removeItem("NotificationAt")    // // // Removing previous time after get notification
            showAndHideImpNotification(false)         // // // calling function to back normal , input of time.

        }, hour * 1000 * 3600);


    }




    /**
     * Register function is created.
     * This function work when a file is present in public folder whit index.html 
     * file name is :- sw.js
     */
    async function registerServiceWorker() {
        await navigator.serviceWorker.register('/sw.js', { scope: './' }).then(function (swRegistration) {
            //you can do something with the service wrker registration (swRegistration)
            // console.log(swRegistration)
        });
    }




    
    /*
    * Below function is main Notification handler fnction.
    * Here at very first check any notification is already submitted.
    * Here first taking value of H given in input field.
    * And then Calling push notification function.
    * If yser wll allow the , then register function will called
    * And then initialization of notification function will called and it has callback to check permission is granted or not.
    * If permission is granted the send actuall function of notification above is decleared(now this calling in last).
    * why in last becz if no task is present in localStorage then send some error alert msg to user.
    * And the what should show that function is callded with false argument.
    * And addHours function is called with new date and hours value as argument.
    * And set localstorage of notification.
    * And set a useState variable with new date value in string (date is converted into str by strin letterls).
    * At last if permission is not granted then send a alert msg.
    */


    async function notificationHandlerMain() {

        // // // Check notification is already set or not ----------->
        let isNotificationSet = localStorage.getItem("NotificationAt")

        if(isNotificationSet){
            setNotiDate(`${isNotificationSet}`)  // // // Seting actual time before show result div
            showAndHideImpNotification(true)  // // // Showing result div here 
           return alert(`Notification is already set at :- ${isNotificationSet}`)
        }



        let hoursInInput = document.getElementById("howManyTimeAgo").value
        // console.log(howManyTimeAgoH)
        if (!hoursInInput) {
            return alert("Notification time is not given.\nGive some time in Hour , how many H ago you want notification.")
        }

        // // // Making into Hour ------->
        // let hour = howManyTimeAgoH * 3600    // // // This is doing in main fuction

        const pushNotificationSuported = isPushNotificationSupported();
        if (pushNotificationSuported) {
            await registerServiceWorker();
            await initializePushNotifications().then(function (consent) {
                if (consent === 'granted') {

                    // let giveNotification = sendNotification(hoursInInput);   // // // Calling main function here.

                    // giveNotification.onclick = (e) => {
                    //     window.location.href = "https://my-todo-zm4b.onrender.com/"
                    // }

                    showAndHideImpNotification(true)    // // // Showing successful msg to user.
                    // // // // Set time when you get notification ------------>
                    let date = new Date()
                    let timeWhenNotiWillSend = addHoursInPresentTime( date , hoursInInput)

                    // console.log(date)
                    // console.log(timeWhenNotiWillSend)
                   localStorage.setItem("NotificationAt" , timeWhenNotiWillSend)

                    // // // Changing type of date to store in useSate() (A good way to put date and time in string letterls)--->
                    setNotiDate( `${timeWhenNotiWillSend}`)


                    // // // Now calling actual function is last ------->
                    let giveNotification = sendNotification(hoursInInput);   // // // Calling main function here.

                    giveNotification.onclick = (e) => {
                        window.location.href = "https://my-todo-zm4b.onrender.com/"
                    }


                } else if (consent !== 'granted') {
                    return alert("Notification permission is denied check Browser setting or this page setting.")
                }
            });
        }

    }


    // // // Below function is used what should show on the basis of true and false value -------------->
    function showAndHideImpNotification(value){

        if( value === true){ 
            // // // true when show result div and hide input div with btn
            document.getElementById("howManyTimeAgo").value = ""
            document.getElementById("notification_set_result").style.display = "block"
            document.getElementById("notification_set_btnAndInput").style.display = "none"
        }else if(value === false){
            // // // false when hide result div and show input div with btn
            document.getElementById("notification_set_result").style.display = "none"
            document.getElementById("notification_set_btnAndInput").style.display = "block"
        }

    }


    // // // This fuction is used to add hours in current time ------------>
    function addHoursInPresentTime(date , hours) {
        date.setHours(date.getHours() + hours);
        return date;
    }



    // // // Below function to reset notification ----------->

    const resetNotification = ()=>{
        let askReset = window.confirm("Do you really want to reset Notificaton?")
        // console.log(askReset)
        if(askReset){
            localStorage.removeItem("NotificationAt")
            showAndHideImpNotification(false)
        }
    }



    /*
    * Actual notification UI code starts here ---->
    * This code is used in a item section of task in Todo.
    */

    return (
        <>

            <div className='notification_div  d-block d-sm-flex justify-content-between border border-info rounded-2 my-2 px-2 '>

                <div className='p-1'>

                    <h5 ><strong>LAST. </strong>Notification Box</h5>
                    <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#aboutNotification" aria-expanded="false" aria-controls="multiCollapseExample2">About</button>
                    <i className="fa-solid fa-bell px-3 fs-4"></i>


                </div>

                <div className='text-danger ' id='notification_set_result' style={ {"display" : "none" }}>

                    <p className='mb-0' >Your Notification is <strong>successfully</strong> set don't close tab now.</p>
                    <p className='mb-0' >Read <strong>About</strong> of notification to get successfull Notification.</p>
                    <p className='mb-0'><strong>At</strong> :-{notiDate}</p>

                    <button className='mb-1 btn btn-outline-danger btn-sm d-flex ms-auto me-5' onClick={()=>{resetNotification()}}>Reset</button>

                </div>

                <div  id='notification_set_btnAndInput'>

                    <p className='mb-0'>⬇️Set Notification in below input box.</p>
                    <input className='inputOfNotification' type="number" id="howManyTimeAgo" max={24} width={"2000vh"} min={0} placeholder={"5H ⌚ Time"} onKeyDown={(e) => {
                        if (e.keyCode === 13) { notificationHandlerMain() }
                    }} />
                    <button className='inputOfNotification btn btn-outline-success btn-sm mb-1' onClick={() => { notificationHandlerMain() }}>Set</button>
                    <p><small className='mb-0'>☝️How many <strong>Hour</strong> after you want notification!</small></p> 
                </div>


            </div>

            <div className="collapse multi-collapse m-2 " id="aboutNotification">
                <div className="card card-body rounded rounded-pill px-3 py-1">
                    Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
            </div>


        </>
    )
}

export default NotificationToDo