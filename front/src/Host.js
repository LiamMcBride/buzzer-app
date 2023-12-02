import './Player.css';
import { useEffect, useState } from 'react'
import axios from 'axios';

function Host(props) {

    const [players, setPlayers] = useState([]);

    // pull the new titles from the backend
    useEffect(() => {
        axios.get('http://localhost:3000/db/find').then(res => {
            setPlayers(res["data"]);
            console.log(res["data"]);
        })
    }, [players])

    return (
        <div>
            <ul>
                players
                {players.map((elem, i) => {
                    return (
                        <p>{elem}</p>
                    )
                })}
            </ul>
        </div>
    );
}

export default Host;
