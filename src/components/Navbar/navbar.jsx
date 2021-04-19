import './navbar.css';
import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <nav className="navbar">
            <span className="navbar-item"><Link to="/"> HOME </Link></span>
            <span className="navbar-item"><Link to="/products"> PRODUCTS </Link></span>
        </nav>
    )
}