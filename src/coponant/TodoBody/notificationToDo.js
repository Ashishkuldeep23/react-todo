import React , {useState} from 'react'

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
                 * shows a notification
                 */
                async function sendNotification(time) {

                    // // // Getting items from localhost  ---->
                    let tasks = localStorage.getItem('myTodoList')

                    let actualArrOfTasks = JSON.parse(tasks)
            
                    // console.log(actualArrOfTasks[0].name)
            
                    let showTasksInNotification = ""
            
                    for (let i = 0; i < actualArrOfTasks.length; i++) {
                        showTasksInNotification += actualArrOfTasks[i].name + ", "
                    }
            
                    // console.log(showTasksInNotification)


                    setTimeout(() => {

                        const text = `Pending tasks are :- [ ${showTasksInNotification} ]`;
                        const title = "ToDo Notification!";
                        const options = {
                            "Content-Type": "text/html",
                            body: text,
                            vibrate: [200, 100, 200],
                            tag: "new-product",
                            // actions: [{ action: "Detail", title: "View",  }]
                        };
                        navigator.serviceWorker.ready.then(function (serviceWorker) {
                            serviceWorker.showNotification(title, options);
                        });
                        
                    }, time * 1000);
    



                }
    
                /**
                 * 
                 */
                async function registerServiceWorker() {
                    await navigator.serviceWorker.register( '/sw.js', {scope: './'}).then(function (swRegistration) {
                        //you can do something with the service wrker registration (swRegistration)
                        // console.log(swRegistration)
                    });
                }
    
    
    
                async function notificationHandlerMain(){

                    let howManyTimeAgoH = document.getElementById("howManyTimeAgo").value

                    // console.log(howManyTimeAgoH)
            
                    if (!howManyTimeAgoH) {
                        return alert("Give some Time in Hour for gettng notification")
                    }
            
    
                    const pushNotificationSuported = isPushNotificationSupported();
                    if (pushNotificationSuported) {
                        await registerServiceWorker();
                        await initializePushNotifications().then(function (consent) {
                            if (consent === 'granted') {

                                let giveNotification =   sendNotification(howManyTimeAgoH);
                                giveNotification.onclick = (e) => {
                                    window.location.href = "https://my-todo-zm4b.onrender.com/"
                                }

                            }else if(consent !== 'granted'){
                                return alert("Notification permission is denied check Browser setting or this page setting.")
                            }
                        });
                    }
                    
                }





    return (
        <>

            <div className=' single_item bg-white d-block d-sm-flex justify-content-between border border-info rounded-2 my-2 px-2 '>

                <div className='p-1'>

                    <h5 ><strong>LAST. </strong>Notification Box</h5>
                    <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#aboutNotification" aria-expanded="false" aria-controls="multiCollapseExample2">About</button>
                    <i className="fa-solid fa-bell px-3 fs-4"></i>


                </div>

                <div className='text-danger py-2' id='notification_set_result'>

                    <p >Your Notification is <strong>successfully</strong> set don't close tab now.</p>
                    <p><strong>At</strong> :-{notiDate}</p>

                </div>

                <div className='me-5 '>

                    <p className='mb-0'>⬇️Set Notification below</p>
                    <input type="number" id="howManyTimeAgo" max={24} width={"2000vh"} min={0} placeholder={"5H ⌚"} onKeyDown={(e) => {
                        if (e.keyCode === 13) { notificationHandlerMain()  }
                    }} />
                    <button className='btn btn-outline-success btn-sm mb-1' onClick={() => { notificationHandlerMain() }}>Set</button>

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