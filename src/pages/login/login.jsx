import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth-context';
import axios from "axios";
import './login.css';

export function Login() {

    const [name, setName] = useState("Shahazad");
    const [password, setPassword] = useState("qwerty");

    const { login, authDispatch } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();

    function handleClick(e) {

        console.log(name, password);
        authDispatch({ type: "LOGOUT_USER" })
        navigate("/");

    }
    async function handleOnSubmit(e) {
        e.preventDefault();
        setName(name);
        setPassword(password);
        try {
            const response = await axios.post("https://neog-ecommerce.herokuapp.com/user", { name: name, password: password })
            console.log(response.data);
            if (response.status === 200) {
                authDispatch({ type: "LOGIN_USER", payload: response.data })
            }
            if (state === null) {
                navigate("/");
            } else {
                navigate(state.from);
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {!login && <form className="form-login" onSubmit={handleOnSubmit} >
                <input type="text" placeholder="Enter Username" onChange={(e) => setName(e.target.value)} value={name} />
                <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className="button-submit">Sign In</button>
            </form>}
            {login && <button className="button-logout" onClick={() => handleClick()}>LogOut</button>}
        </>
    )
}