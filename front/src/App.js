import logo from './logo.svg';
import './App.css';
import Login from './Login';
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
  }

  return (
    <div className="App">
      {screen()}
    </div>
  );
}

export default App;
