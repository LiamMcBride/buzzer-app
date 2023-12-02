import axios from 'axios';
import './Login.css';
import {useState} from 'react'

function Login(props) {

    const [name, setName] = useState("")

    function inputHandler(e) {
        if (e.target.value !== ""){
            setName(e.target.value)
        }
        else {
            setName("")
        }
    }

    function loginHandler(n) {
        props.loginHandler(n);
        axios.post(`${props.baseUrl}/db/join/`, {name: n})
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }

    return (
        <div id="loginScreen">
            <button onClick={() => loginHandler(name)} disabled={name === ""}>Join</button>
            <input onInput={inputHandler} id="name-input" placeholder="enter name"></input>
        </div>
    );
}

export default Login;
