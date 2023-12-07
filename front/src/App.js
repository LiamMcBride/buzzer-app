import './App.css';
import Login from './Login';
import Player from './Player';
import Host from './Host';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [login, setLogin] = useState("");
  const [players, setPlayers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [kick, setKick] = useState([]);

  const protocol = window.location.protocol;
  const host = window.location.host;

  // Set the base URL
  let newBaseUrl = `${protocol}//${host}`;
  newBaseUrl = newBaseUrl.slice(0, -1) + "0";
  const [baseUrl, setBaseUrl] = useState(newBaseUrl);

  function loginHandler(name) {
    setLogin(name);
  }

  const screen = () => {
    if (login === "") { // Login screen
      return (<Login players={players} baseUrl={baseUrl} loginHandler={loginHandler} />);
    }
    if (login == "admin") { // Host screen
      return (<Host blocked={blocked} queue={queue} players={players} baseUrl={baseUrl}></Host>);
    }
    else {
      return (<Player kick={kick} blocked={blocked} players={players} baseUrl={baseUrl} name={login} logout={() => setLogin("")} />);
    }
  }

  // pull the new titles from the backend
  useEffect(() => {
    axios.get(`${baseUrl}/db/find`).then(res => {
      setPlayers(res["data"]["players"]);
      setQueue(res["data"]["queue"]);
      setBlocked(res["data"]["blocked"]);
      setKick(res["data"]["kick"]);
    });
  }, [players, queue, blocked, kick])

  return (
    <div className="App">
      {screen()}
    </div>
  );
}

export default App;
