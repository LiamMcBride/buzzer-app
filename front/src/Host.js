import './Host.css';
import { useEffect, useState } from 'react'
import axios from 'axios';

function Host(props) {

    function handleKick(e) {
        var remove = props.players[e.target.id];
        axios.post(`${props.baseUrl}/db/kick/`, { name: remove })
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }

    function handleDequeue() {
        axios.post(`${props.baseUrl}/db/dequeue/`, {})
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }

    function handleClear() {
        axios.post(`${props.baseUrl}/db/clear/`, {})
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
            // enable all buttons
    }

    return (
        <div>
            <ul>
                <h1>Players</h1>
                {props.players.map((elem, i) => {
                    return (
                        <div class="player">
                            <p class="name">{elem}</p>
                            <button id={i} onClick={handleKick}>❌</button>
                        </div>
                    )
                })}
            </ul>
            <ul>
                <h1>Queue</h1>
                <button onClick={handleDequeue}>Dequeue</button>
                <button onClick={handleClear}>Clear</button>
                {props.queue.map((elem, i) => {
                    return (
                        <div class="player">
                            <p class="name">{elem}</p>
                        </div>
                    )
                })}
            </ul>
        </div>
    );
}

export default Host;
