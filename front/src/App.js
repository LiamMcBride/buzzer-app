import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Player from './Player';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState("")

  function loginHandler(type) {
    setLoggedIn(type)
  }

  const screen = () => {
    if (loggedIn === "") {
      return (<Login loginHandler={loginHandler}/>)
    }
    if (loggedIn !== "host"){
      return (<Player logout={() => setLoggedIn("")}/>)
    }
  }

  return (
    <div className="App">
      {screen()}
    </div>
  );
}

export default App;
