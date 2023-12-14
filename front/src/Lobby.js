import './Lobby.css';
import { useEffect, useState } from 'react'
import axios from 'axios';

function Lobby(props) {

    function handleExit(e) {

        var result = true;

        if (e !== "unload") {
            result = window.confirm("Do you wish to exit?")
        }

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

        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        const handleBeforeUnload = () => {
            handleExit("unload");
        };

        const handleVisibilityChange = () => {
            if (isMobileDevice) {
                handleExit("unload");
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        // document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            // document.removeEventListener("visibilitychange", handleVisibilityChange);
        }

    },[]);

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

    }, [props.kick]);

    return (
        <div>
             <button onClick={handleExit} id="exit">
                <span>Exit</span>
            </button>
            <p>Waiting for the host to start the game...</p>
            {props.players.map((elem, i) => {
                return (
                    <div class="player">
                        <p class="name">{elem}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Lobby;