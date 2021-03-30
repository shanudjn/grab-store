import './navbar.css';
export function Navbar({ setRoute }) {
    return (
        <nav className="navbar">
            <p className="navbar-tab" onClick={() => setRoute("home")}>HOME</p>
            <p className="navbar-tab" onClick={() => setRoute("productListing")}>PRODUCTS</p>
            <p className="navbar-tab" >OFFERS</p>
        </nav>
    )
}