import React from "react";
import "./index.css"

import Todo  from "./coponant/TodoBody/todo";
import Header from "./coponant/Header/header"
import Feedback  from "./coponant/Feedback/feedbackMain";

import AboutMe from "./coponant/Feedback/aboutMe";

function App() {
  return (
    <div className="App">

      <Header />
      <Todo />
      <Feedback />

      {/* Experiment */}
      {/* <AboutMe /> */}


    </div>
  );
}

export default App;
