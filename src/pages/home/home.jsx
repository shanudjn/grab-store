import './home.css';
import hero from '../../assets/jpg/hero-img.jpg'

export function Home({ setRoute }) {
    return (
        <main>
            <div className="hero">
                <div className="image-container"> <p>Find merch of your favorite celebrities.</p><img src={hero} alt="hero-img" /></div>

                <button onClick={() => setRoute("productListing")}>Shop Now</button>
            </div>
        </main >
    )
}