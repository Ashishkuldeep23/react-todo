import React, { useState, useEffect } from 'react'
import "./style.css"


// // // Get the local storage data back ----->

const getLocalData = () => {
    const lists = localStorage.getItem("myTodoList");

    if (lists) {
        return JSON.parse(lists)
    } else {
        return []
    }

}


const Todo = () => {

    const [newTask, setNewTask] = useState("");

    // // // Below for set item by given data and locally present data
    const [items, setItems] = useState(getLocalData())

    const [isEditTask, setUpdateTask] = useState("");

    const [toggleBtn, setToggleBtn] = useState(false)

    // // // add items function
    function addItems() {
        if (!newTask) {
            alert('Please give some task to add!')
        }
        else if (newTask && toggleBtn) {
            setItems(
                items.map((curEle) => {
                    if (curEle.id === isEditTask) {
                        return { ...curEle, name: newTask }
                    }

                    return curEle;
                })
            )

            setNewTask([])
            setUpdateTask(null)
            setToggleBtn(false)

        }
        else {
            const myNewTask = {
                id: new Date().getTime().toString(),
                name: newTask ,
                date : new Date()
            }
            setItems([...items, myNewTask])
            setNewTask("")
        }
    }



    // // // Update items --->

    const updateTask = (idGeted, name) => {

        // // By below line of code when update btn clicked then input in focused mode means ready to take input.
        document.getElementById("mainInput").focus()

        setNewTask(name)
        setUpdateTask(idGeted)
        setToggleBtn(true)
        // // // Please see the else if condition of addItems.
    }




    // // // Delete single item --->
    function deleteOneItem(idGeted) {
        const updatedItems = items.filter((curEle) => {
            return curEle.id !== idGeted
        })
        setItems(updatedItems)
    }



    // // // // Removing all Tasks -->
    const removeAllTasks = () => {
        setItems([]);
    }



    // // // Data save in local storage by useEffect hooks -->
    useEffect(() => {
        localStorage.setItem("myTodoList", JSON.stringify(items))
    }, [items])




    // // // Time how many ago written a task.
    const timeDiffFunc = (date) => {


        let outPut = ""

        let date1 = new Date()    // // Current time
        let date2 = new Date(date)   // // When task created
        
        var Difference_In_Time = date1.getTime() - date2.getTime()
        
        // console.log(Difference_In_Time)
        
        var Difference_In_Hour = Difference_In_Time / (1000 * 3600);
        let rounded = Math.round(Difference_In_Hour)

        if (rounded > 2) {
            outPut = rounded + " H Ago"
        }

        if (rounded > 24) {
            let days = Math.round(rounded / 24)
            outPut = days + " D Ago"
        }

        if (rounded > 730) {
            let months = Math.round(rounded / 730)
            outPut = months + " M Ago"
        }

        if (rounded > 8766) {
            let years = Math.round(rounded / 8766)
            outPut = years + " Y Ago"
        }

        return outPut
    }




    // // // UI starts here -------------->

    return (


        <div className="container min-vw-100  todo_main_body">

            <div className="row  ">


                <div className="col-12 col-sm-9  mx-auto p-3 d-flex flex-column align-items-center ">

                    <div>
                        <img src="https://i.pinimg.com/564x/3c/6d/eb/3c6debf67d550119ae777083c4b5b4ed.jpg" id='todoImag' alt="Todo" />
                    </div>

                    
                    <h1 className='text-white'>Todo ( My schedule is )</h1>

                    {/* Input section */}
                    <div className="input-group ">
                        <input className="form-control round_btm_input bg-info text-white" placeholder='✍️Write your task!' id='mainInput' type="text"
                            value={newTask} onChange={(e) => { setNewTask(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) { addItems() }
                            }}
                        />
                        <span className="input-group-text round_btm_input bg-warning">

                            {
                                toggleBtn ? <i className="fa-solid fa-file-pen" onClick={addItems} ></i> : <input type="button" value="Add" onClick={addItems} />
                            }

                        </span>
                    </div>


                    {/* Item section */}


                    {/* Dummy item first */}

                    <div className="items ">

                        <div className=' single_item d-flex justify-content-between border border-info rounded-2  p-2'>
                            <p className='my-auto'><strong>0.</strong> Dummy Task</p>

                            <div className='item_icons d-sm-flex '>

                                {/* Below line for how many ago , curEle.id is storing time when created */}
                                <span className='dayAgo'><small>3 H Ago(Time)</small></span>

                                <div className='update_main mx-auto' >
                                    <div className="dropdown-content_update">
                                        <p className='bg-success'>Update</p>
                                    </div>

                                    <button id='updete' type="button" className="btn btn-outline-success btn-sm" >
                                        <i className="fa-solid fa-file-pen"></i>
                                    </button>
                                </div>


                                <div className="delete_one mx-auto" >
                                    <div className="dropdown-content_delone ">
                                        <p>Delete</p>
                                    </div>

                                    <button type="button" className="btn btn-outline-danger btn-sm">
                                        <i className="fa-solid fa-delete-left"></i>
                                    </button>
                                </div>
                                
                                {/* Below line for how many ago , curEle.id is storing time when created
                                <span className='dayAgo'><small>3 H Ago</small></span> */}


                            </div>
                        </div>


                        {/* Actual Data here start ----> */}

                        {
                            items.map((curEle, index) => {
                                return (


                                    <div className=' single_item d-flex justify-content-between border border-info rounded-2  p-2' key={curEle.id}>
                                        <p className='my-auto'><strong>{index + 1}.</strong> {curEle.name}</p>

                                        <div className='item_icons d-sm-flex '>

                                            {/* Below line for how many ago , curEle.id is storing time when created */}
                                            <span className=' dayAgo'><small>{timeDiffFunc(curEle.date)}</small></span>

                                            <div className='update_main mx-auto' onClick={() => { updateTask(curEle.id, curEle.name) }}>
                                                <div className="dropdown-content_update" onClick={() => { updateTask(curEle.id, curEle.name) }}>
                                                    <p className='bg-success'>Update</p>
                                                </div>

                                                <button id='updete' type="button" className="btn btn-outline-success btn-sm" >
                                                    <i className="fa-solid fa-file-pen"></i>
                                                </button>
                                            </div>


                                            <div className="delete_one mx-auto" onClick={() => { deleteOneItem(curEle.id) }} >
                                                <div className="dropdown-content_delone " onClick={() => { deleteOneItem(curEle.id) }} >
                                                    <p>Delete</p>
                                                </div>

                                                <button type="button" className="btn btn-outline-danger btn-sm">
                                                    <i className="fa-solid fa-delete-left"></i>
                                                </button>
                                            </div>


                                        </div>
                                    </div>



                                )
                            })
                        }

                    </div>


                    {/* Clear All section */}


                    <div className="clear d-flex justify-content-center align-items-center bg-warning">

                        <div className="delete_one this_to_all_del" onClick={removeAllTasks} >

                            <div className="dropdown-content_delone this_to_all_del " onClick={removeAllTasks} >
                                <p>Delete All</p>
                            </div>

                            <button type="button" className="btn btn-outline-danger btn-lg" >
                                <i className="fa-sharp fa-solid fa-trash"></i>
                            </button>

                        </div>

                    </div>

                    {/* Div used for gap*/}
                    <div id="forGap"></div>


                </div>

            </div>

        </div>

    )
}

export default Todo