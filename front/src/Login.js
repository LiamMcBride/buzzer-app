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

    return (
        <div>
            <button onClick={() => props.loginHandler("host")}>Host Login</button>
            <button onClick={() => props.loginHandler(name)} disabled={name === ""}>Player Login</button>
            <input onChange={inputHandler} id="name-input" placeholder="enter name"></input>
        </div>
    );
}

export default Login;
