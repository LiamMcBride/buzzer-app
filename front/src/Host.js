import './Host.css';
import { useEffect, useState } from 'react'
import axios from 'axios';

function Host(props) {

    function handleKick(e) {
        var remove = props.players[e.target.id];
        axios.post(`${props.baseUrl}/db/leave/`, {name: remove})
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }

    return (
        <div>
            <ul>
                Players
                {props.players.map((elem, i) => {
                    return (
                        <div class="player">
                        <p class="name">{elem}</p>
                        <button id={i} onClick={handleKick}>❌</button>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}

export default Host;
