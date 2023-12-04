import axios from 'axios';
import './Login.css';
import { useState, useEffect } from 'react'
import Filter from 'bad-words';


function Login(props) {

    const [name, setName] = useState("")

    function inputHandler(e) {
        document.getElementById("taken").className = "hidden";
        let x = e.target.value
        if (x !== ""){
            const filter = new Filter()
            x = filter.clean(x)
            console.log(x)
            setName(x)
        }
        else {
            setName("")
        }
    }

    function loginHandler(n) {
        if (props.players.includes(n)) {
            document.getElementById("taken").className = "";
        }
        else {
            props.loginHandler(n);
            axios.post(`${props.baseUrl}/db/join/`, {name: n})
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
        }
    }


    return (
        <div id="loginScreen">
            <button onClick={() => loginHandler(name)} disabled={name === ""}>
                <span>Join</span>
            </button>
            <input onInput={inputHandler} id="name-input" placeholder="enter name"></input>
            <p id="taken" class="hidden">Name Taken</p>
        </div>
    );
}

export default Login;
