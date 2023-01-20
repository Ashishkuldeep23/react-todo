import React from 'react'
import "./style.css"
const Header = () => {
  return (
    <>
      <div className="header_main">
        <h1> <i className="fa-solid fa-rectangle-list"></i> Make Your Day Here</h1>

        <div className="info">
          <p className='m-0'>
            <a className="btn btn-primary px-2 py-0 bg-dark" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
              <i className="fa-solid fa-circle-info"></i> Show Info
            </a>

          </p>
          <div className=" collapse border border-warning" id="collapseExample1">
            <div className=" info_content card card-body py-0">
              <h5 className='text-center'>About ToDo and This website :-</h5>

              <ol >
                <li>
                  ToDo app is used to maintain Your day-to-day tasks or list everything that you have to do today or tomorrow (<strong>Something that someone will need to do</strong>).
                </li>

                <li>
                  In this web app, users can write <strong>tasks</strong> that he/her want to do today or tomorrow.
                </li>

                <li>
                  Here users can write <strong>tasks and update it and delete it</strong>.
                </li>

                <li>
                  One <strong> All delete button</strong> is present (In bottom center), so the user can delete his/her all unlock tasks in one go.
                </li>

                <li>
                  After writing a task, the user can <strong> lock</strong> the task so that it will not be deleted with all delete button.
                </li>

                <li>
                  After 2 hours , the user can see <strong> the time</strong> when he/she wrote the task (In the left side of tasks).
                </li>

                <li>
                 <strong> Icons are</strong> :- <i className="fa-solid fa-square-plus" ></i> : Add , <i className="fa-solid fa-file-pen"></i> : Update , <i className="fa-solid fa-lock"></i> : Lock ,  <i className="fa-solid fa-delete-left"></i> : Delete ,  <i className="fa-sharp fa-solid fa-trash"></i> : All Delete.
                </li>

                <li>
                  If you like this web app then you can post your feedback , by clicking on the <strong>feedback section button</strong>.
                </li>


                <li>
                  Your tasks are stored in your browser's localstorage , so don't worry about that (<strong>Privacy First</strong>).
                </li>

                <li>
                  You can write your name in front of ToDo input and hit Enter Key After that your name is visible. (<strong>Your Name , Hit Enter</strong>)
                </li>

                <p className='text-center '> <i className="fa-brands fa-youtube"></i> -: <a  href="https://www.youtube.com/" rel="noreferrer" target={"_blank"}>https://www.youtube.com/</a></p>
              </ol>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Header