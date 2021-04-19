import './login.css';

export function Login() {
    return (
        <>
            <form className="form-login" >
                <input placeholder="Enter Username" />
                <input placeholder="Enter Password" />
                <button>Submit</button>
            </form>
        </>
    )
}