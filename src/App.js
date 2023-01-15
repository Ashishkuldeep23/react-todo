import React from "react";
import "./index.css"

import Todo  from "./coponant/TodoBody/todo";
import Header from "./coponant/Header/header"
import Feedback  from "./coponant/Feedback/feedback";

function App() {
  return (
    <div className="App">

      <Header />
      <Todo />
      <Feedback />
    </div>
  );
}

export default App;
