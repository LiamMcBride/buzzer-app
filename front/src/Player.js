import './Player.css';
import { useRef, useEffect } from 'react'
import axios from 'axios';
import { Howl, Howler} from 'howler';

function Player(props) {

    const soundRef = useRef(null);

    
    
    function playSound() {
 
        if (soundRef.current) {
            soundRef.current.stop();
        }

        soundRef.current = new Howl({
            src: ['/sound.mp3'],
            onend: () => {
                soundRef.current.unload();
            },
        });

        soundRef.current.play();
    }

    function handleBuzz(e) {
        if (!document.getElementById("buzzer").classList.contains("disabled")) {
            playSound();
            axios.post(`${props.baseUrl}/db/enqueue/`, { name: props.name })
                .then(response => {
                    console.log('Response:', response.data);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });
        }
    }

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

    }, []);

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
