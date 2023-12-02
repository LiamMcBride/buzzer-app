import './Player.css';
import {useState} from 'react'

function Player(props) {

    function handleExit(e) {
        const result = window.confirm("Do you wish to exit?")

        if(result) {
            props.logout()
        }
    }

    return (
        <div>
            <button onClick={handleExit} class="exit">Exit</button>
            <button class="buzzer">Buzz</button>
        </div>
    );
}

export default Player;
