import './Player.css';
import {useState, useEffect} from 'react'
import axios from 'axios';

function Player(props) {

    function handleBuzz(e) {
        axios.post(`${props.baseUrl}/db/enqueue/`, {name: props.name})
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
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
            props.logout();
        }
    }

    useEffect(() => {
        var queued = false;
        props.queue.forEach((elem, i) => {
            if (elem == props.name) {
                queued = true;
            }
        });

        if (queued) {
            document.getElementById("buzzer").classList.add("disabled");
            document.getElementById("buzzer").classList.remove("buzzer");
        }
        else {
            document.getElementById("buzzer").classList.remove("disabled");
            document.getElementById("buzzer").classList.add("buzzer");
        }
    },[props.queue]);

    // useEffect(() => {
    //     var present = false; // is the name in the list of players?
    //     props.players.forEach(function (name) {
    //         console.log(name + "   " + props.name);
    //         if (name == props.name) { 
    //             present = true;
    //         }
    //     })
    //     if (!present) {
    //         props.logout();
    //     }
    // },[])

    return (
        <div>
            <button onClick={handleExit} id="exit">Exit</button>
            <h1>{props.name}</h1>
            <button class="buzzer" onClick={handleBuzz} id="buzzer">Buzz</button>
        </div>
    );
}

export default Player;
