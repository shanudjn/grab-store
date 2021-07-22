import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth-context';
import axios from "axios";
import './login.css';
import { Link } from "react-router-dom";


export function Login() {

    const [name, setName] = useState("test");
    const [password, setPassword] = useState("qwerty");
    const [loginButtonText, setLoginButtonText] = useState("Sign In")

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
        setLoginButtonText("Signing in . . .")
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
                <h3>Login</h3>
                <input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} value={name} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className="button-submit">{loginButtonText}</button>
                <p>New User ? <Link to="/signup">SignUp</Link> Here</p>
            </form>}
            {login && <button className="button-logout" onClick={() => handleClick()}>LogOut</button>}
        </>
    )
}