import { useState } from 'react';
import { useAuth } from '../../context/auth-context';
import './login.css';

export function Login() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const { login, authDispatch } = useAuth();

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(name, password);

    }
    function handleClick() {
        authDispatch({ type: "LOGIN_USER" })
    }

    return (
        <>
            <form className="form-login" onSubmit={handleOnSubmit} >
                <input placeholder="Enter Username" onChange={(e) => setName(e.target.value)} />
                <input placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                <button >Submit</button>

            </form>
            <button style={{ position: "absolute", top: "10rem" }} onClick={handleClick}>{login ? "Log Out" : "Log In"}</button>
        </>
    )
}