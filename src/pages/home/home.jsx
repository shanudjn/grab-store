import './home.css';
import hero from '../../assets/jpg/hero-img.jpg';
import { Navbar } from "../../components/Navbar/navbar";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <main>
            <Navbar />
            <div className="hero">
                <div className="image-container">
                    <p>Find merch of your favorite celebrities.</p>
                    <img src={hero} alt="hero-img" />
                </div>
                <Link to="/products">
                    <button className="btn btn-primary button-home">Shop Now</button></Link>
            </div>
        </main >
    )
}