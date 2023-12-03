import './Player.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

function Player(props) {

    function handleBuzz(e) {
        axios.post(`${props.baseUrl}/db/enqueue/`, { name: props.name })
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }

    function handleExit(e) {
        const result = window.confirm("Do you wish to exit?")
        if (result) {
            axios.post(`${props.baseUrl}/db/leave/`, { name: props.name })
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

        if (props.kick == props.name) {
            axios.post(`${props.baseUrl}/db/leave/`, { name: props.name })
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });

            axios.post(`${props.baseUrl}/db/kick/`, { name: "default" })
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });
            props.logout();
        }

        var blocked = false;
        props.blocked.forEach((elem, i) => {
            if (elem == props.name) {
                blocked = true;
            }
        });

        if (blocked) {
            document.getElementById("buzzer").classList.add("disabled");
            document.getElementById("buzzer").classList.remove("buzzer");
        }
        else {
            document.getElementById("buzzer").classList.remove("disabled");
            document.getElementById("buzzer").classList.add("buzzer");
        }
    }, [props.blocked, props.kick]);

    return (
        <div>
            <button onClick={handleExit} id="exit">
                <span>Exit</span>
            </button>
            <h1>{props.name}</h1>
            <button class="buzzer" onClick={handleBuzz} id="buzzer">
                <span>Press Me</span>
            </button>
        </div>
    );
}

export default Player;
