import { useState } from 'react';
import axios from "axios"
import { Navigate } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const { state } = useLocation();
    const navigate = useNavigate();

    async function handleSignUp(e) {
        // console.log(e)
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:8080/user/signup", { user: { name: name, password: password } })
            // console.log(response);
            if (response.status === 201) {
                showToast()
                navigate("/")
            }

        } catch (error) {
            console.log(error)
        }
    }


    function showToast() {
        toast.success("Signup Successful!!", { autoClose: 2000, });
    }

    return (
        <>
            <form className="form-login" onSubmit={handleSignUp}>
                <h3>Signup</h3>
                <input type="text" placeholder="Enter Username" onChange={(e) => setName(e.target.value)} value={name} />
                <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className="button-submit" >Sign Up</button>
                <ToastContainer />
            </form>

        </>
    )
}

export default Signup
