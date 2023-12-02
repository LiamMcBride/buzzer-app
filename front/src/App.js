import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Player from './Player';
import Host from './Host';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [login, setLogin] = useState("");
  const [players, setPlayers] = useState([]);
  const [kickObserver, setkickObserver] = useState(0);
  
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
      return (<Login players={players} baseUrl={baseUrl} loginHandler={loginHandler}/>);
    }
    if (login == "admin") { // Host screen
      return (<Host observe={() => setkickObserver(kickObserver + 1)} players={players} baseUrl={baseUrl}></Host>);
    }
    else {
      return (<Player kickObserver={kickObserver} players={players} baseUrl={baseUrl} name={login} logout={() => setLogin("")}/>);
    }
  }

  // pull the new titles from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/db/find').then(res => {
        setPlayers(res["data"]);
        // console.log(res["data"]);
    })
}, [players])

  return (
    <div className="App">
      {screen()}
    </div>
  );
}

export default App;
