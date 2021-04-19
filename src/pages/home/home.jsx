import './home.css';
import hero from '../../assets/jpg/hero-img.jpg';
import { Navbar } from "../../components/Navbar/navbar"

export function Home() {
    return (
        <main>
            <Navbar />
            <div className="hero">
                <div className="image-container"> <p>Find merch of your favorite celebrities.</p><img src={hero} alt="hero-img" /></div>

                <button >Shop Now</button>
            </div>
        </main >
    )
}