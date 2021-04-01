import './home.css';

export function Home({ setRoute }) {
    return (
        <main>
            <div className="hero">
                <p>Find merch of your favorite celebrities.</p>
                <button onClick={() => setRoute("productListing")}>Shop Now</button>
            </div>
        </main>
    )
}