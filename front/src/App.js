import './App.css';
import Login from './Login';
import Player from './Player';
import Host from './Host';
import Lobby from './Lobby';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [login, setLogin] = useState("");
  const [players, setPlayers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [kick, setKick] = useState([]);
  const [start, setStart] = useState(null);

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
      return (<Host start={start} blocked={blocked} queue={queue} players={players} baseUrl={baseUrl}></Host>);
    }
    else {
      if (start) {
      return (<Player start={start} kick={kick} blocked={blocked} players={players} baseUrl={baseUrl} name={login} logout={() => setLogin("")} />);
      }
      else {
        return (<Lobby baseUrl={baseUrl} kick={kick} name={login} logout={() => setLogin("")} players={players}></Lobby>);
      }
    }
  }

  // pull the new titles from the backend
  useEffect(() => {
    axios.get(`${baseUrl}/db/find`).then(res => {
      setPlayers(res["data"]["players"]);
      setQueue(res["data"]["queue"]);
      setBlocked(res["data"]["blocked"]);
      setKick(res["data"]["kick"]);
      setStart(res["data"]["start"]);
    });
  }, [players, queue, blocked, kick, start])

  return (
    <div className="App">
      {screen()}
    </div>
  );
}

export default App;
