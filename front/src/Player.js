import './Player.css';
import {useState} from 'react'
import axios from 'axios';

function Player(props) {

    function handleBuzz(e) {

    }

    function handleExit(e) {
        const result = window.confirm("Do you wish to exit?")
        if(result) {
            axios.post(`${props.baseUrl}/db/leave/`, {name: props.name})
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
            props.logout()
        }
    }

    return (
        <div>
            <button onClick={handleExit} id="exit">Exit</button>
            <button onClick={handleBuzz} id="buzzer">Buzz</button>
        </div>
    );
}

export default Player;
