import './header.css';


export function Header({ setRoute }) {
    return (
        <nav className="header">
            <div className="brand-section">
                <h1 onClick={() => setRoute("home")}>Grab Store</h1>
            </div>
            <div className="brand-logo" onClick={() => setRoute("home")}>
                <h1>GS</h1>
            </div>
            <div className="div-search">
                <form className="form-div-search">
                    <input
                        type="text"
                        placeholder="Search Products Here" width="20"
                    />
                    <button className="button-search">
                        <span className="material-icons">search</span>
                    </button>
                </form>
            </div>
            <div className="inventory-section">
                <ul className="inventory-list">
                    <li className="inventory-list-item">

                        <span
                            className="material-icons icons"
                            onClick={() => setRoute("wishlist")}

                        >
                            favorite_border
                            </span>
                        <span className="badge-notification2">2</span>

                    </li>

                    <li className="inventory-list-item">

                        <span
                            className="material-icons icons"
                            onClick={() => setRoute("cart")}

                        >
                            shopping_cart
                            </span>
                        <span className="badge-notification2">2</span>

                    </li>
                </ul>
            </div>
        </nav>

    );
}