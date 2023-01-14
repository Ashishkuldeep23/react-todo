import React, { useState , useEffect } from 'react'
import "./style.css"


// // // Get the local storage data back ----->

const getLocalData = ()=>{
    const lists = localStorage.getItem("myTodoList");

    if(lists){
        return JSON.parse(lists)
    }else{
        return []
    }

}


const Todo = () => {

    const [newTask, setNewTask] = useState("");

    // // // Below for set item by given data and locally present data
    const [items, setItems] = useState(getLocalData())

    const [ isEditTask , setUpdateTask] = useState("");

    const [toggleBtn , setToggleBtn] = useState(false)

    // // // add items function
    function addItems() {
        if (!newTask) {
            alert('Please give some task to add!')
        }
        else if(newTask && toggleBtn){
            setItems(
                items.map((curEle)=>{
                    if(curEle.id === isEditTask){
                        return { ...curEle, name : newTask}
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
                id : new Date().getTime().toString() ,
                name : newTask
            }
            setItems([...items, myNewTask])
            setNewTask("")
        }
    }



    // // // Update items --->

    const updateTask = (idGeted , name)=>{
        setNewTask(name)
        setUpdateTask(idGeted) 
        setToggleBtn(true)       
        // // // Please see the else if condition of addItems.
    }




    // // // Delete single item --->
    function deleteOneItem (idGeted){
        const updatedItems = items.filter((curEle)=>{
            return curEle.id !== idGeted
        })
        setItems(updatedItems)
    }


    // // // // Removing all Tasks -->
    const removeAllTasks=()=>{
        setItems([]);
    }


    // // // Data save in local storage by useEffect hooks -->
    useEffect(()=>{
        localStorage.setItem("myTodoList" , JSON.stringify(items))
    } , [items])



    return (


        <div className="container min-vw-100">

            <div className="row ">

                
                <div className="col-12 col-sm-9  mx-auto p-3 d-flex flex-column align-items-center ">

                    <h1 className='text-white'>My Todo ( My schedule is )</h1>

                    {/* Input section */}
                    <div className="input-group ">
                        <input className="form-control round_btm_input" placeholder='✍️Write your task!' id='mainInput' type="text"
                            value={newTask} onChange={(e) => { setNewTask(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) { addItems() }
                            }}
                        />
                        <span className="input-group-text round_btm_input ">

                            {
                                toggleBtn ?  <i className="fa-solid fa-file-pen" onClick={addItems} ></i> : <input type="button" value="Add" onClick={addItems} />
                            }
                            
                        </span>
                    </div>


                    {/* Item section */}
                    <div className="items ">


                        {
                            items.map((curEle, index) => {
                                return (


                                    <div className=' d-flex justify-content-between border border-info rounded-2  p-2' key={curEle.id}>
                                        <p className='my-auto'>{index + 1}. {curEle.name}</p>

                                        <div className='item_icons d-sm-flex '>

                                            <div className='update_main mx-auto' onClick={()=>{ updateTask(curEle.id , curEle.name)}}>
                                                <div className="dropdown-content_update"  onClick={()=>{ updateTask(curEle.id , curEle.name)}}>
                                                    <p className='bg-success'>Update</p>
                                                </div>

                                                <button id='updete' type="button" className="btn btn-outline-success btn-sm" >
                                                    <i className="fa-solid fa-file-pen"></i>
                                                </button>
                                            </div>


                                            <div className="delete_one mx-auto" onClick={()=>{ deleteOneItem(curEle.id) }} >
                                                <div className="dropdown-content_delone "  onClick={()=>{ deleteOneItem(curEle.id) }} >
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


                    <div className="clear d-flex justify-content-center align-items-center">

                        <div className="delete_one this_to_all_del" onClick={removeAllTasks} >

                            <div className="dropdown-content_delone this_to_all_del " onClick={removeAllTasks} >
                                <p>Delete All</p>
                            </div>

                            <button type="button" className="btn btn-outline-danger btn-lg" >
                                <i className="fa-sharp fa-solid fa-trash"></i>
                            </button>

                        </div>

                    </div>







                </div>

            </div>

        </div>

    )
}

export default Todo