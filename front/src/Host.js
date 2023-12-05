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
    }

    function toggleBlocked() {
        if (document.getElementById("blocked").classList.contains("hidden")) {
            document.getElementById("blocked").classList.remove("hidden");
        }
        else {
            document.getElementById("blocked").classList.add("hidden");
        }
    }

    function togglePlayers() {
        if (document.getElementById("players").classList.contains("hidden")) {
            document.getElementById("players").classList.remove("hidden");
        }
        else {
            document.getElementById("players").classList.add("hidden");
        }
    }

    return (
        <div id="hostScreen">
            <div id="container">
                <ul id="queue">
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
                <ul id="players">
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
                <ul id="blocked" class="hidden">
                    <h1>Blocked</h1>
                    {props.blocked.map((elem, i) => {
                        return (
                            <div>
                                <p class="name">{elem}</p>
                            </div>
                        )
                    })}
                </ul>
            </div>
            <div id="toggles">
                <button class="toggle" onClick={togglePlayers}>
                    <span>Toggle Players</span>
                </button>
                <button class="toggle" onClick={toggleBlocked}>
                    <span>Toggle Blocked</span>
                </button>
            </div>
        </div>
    );
}

export default Host;
