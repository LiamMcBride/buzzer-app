import './Login.css';
import {useRef, useState} from 'react'

function Login() {

    const [nameFilled, setNameFilled] = useState(false)

    function inputHandler(e) {
        if (e.target.value !== ""){
            setNameFilled(true)
        }
        else {
            setNameFilled(false)
        }
    }

    return (
        <div className="App">
        <button>Host Login</button>
        <button disabled={!nameFilled}>Player Login</button>
        <input onChange={inputHandler} id="name-input" placeholder="enter name"></input>
        </div>
    );
}

export default Login;
