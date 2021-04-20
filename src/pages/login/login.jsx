import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth-context';
import axios from "axios";
import './login.css';

export function Login() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const { login, authDispatch } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(name, password);

    }
    async function handleClick() {
        try {
            const response = await axios.post("https://ecommerce.shahazad.repl.co/login", { name: "Shahazad", password: "qwerty" })
            console.log(response.status);
            if (response.status === 200) {
                authDispatch({ type: "LOGIN_USER" })
            }
            if (state === null) {
                navigate("/");
            } else {
                navigate(state.from);
            }
        } catch (error) {
            console.log(error)
        }

        // authDispatch({ type: "LOGIN_USER" })
    }
    console.log({ state })
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