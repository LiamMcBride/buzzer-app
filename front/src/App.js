import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Player from './Player';
import Host from './Host';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [login, setLogin] = useState("")
  
  const protocol = window.location.protocol;
  const host = window.location.host;
  
  // Set the base URL
  let newBaseUrl = `${protocol}//${host}`;
  newBaseUrl = newBaseUrl.slice(0,-1) + "0"
  const [baseUrl, setBaseUrl] = useState(newBaseUrl)

  function loginHandler(name) {
    setLogin(name);
  }

  const screen = () => {
    if (login === "") { // Login screen
      return (<Login baseUrl={baseUrl} loginHandler={loginHandler}/>);
    }
    if (login == "admin") { // Host screen
      return (<Host></Host>);
    }
    else {
      return (<Player baseUrl={baseUrl} name={login} logout={() => setLogin("")}/>);
    }
  }

  return (
    <div className="App">
      {screen()}
    </div>
  );
}

export default App;
