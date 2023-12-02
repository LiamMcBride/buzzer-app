import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Player from './Player';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState("")
  
  const protocol = window.location.protocol;
  const host = window.location.host;
  
  // Set the base URL
  let newBaseUrl = `${protocol}//${host}`;
  newBaseUrl = newBaseUrl.slice(0,-1) + "0"
  const [baseUrl, setBaseUrl] = useState(newBaseUrl)

  function loginHandler(type) {
    setLoggedIn(type)
  }

  const screen = () => {
    if (loggedIn === "") {
      return (<Login baseUrl={baseUrl} loginHandler={loginHandler}/>)
    }
    if (loggedIn !== "host"){
      return (<Player baseUrl={baseUrl} name={loggedIn} logout={() => setLoggedIn("")}/>)
    }
  }

  return (
    <div className="App">
      {screen()}
    </div>
  );
}

export default App;
