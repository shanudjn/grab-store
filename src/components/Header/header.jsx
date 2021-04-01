import { useState } from 'react';
import { useProduct } from '../../context/product-context';
import './header.css';


export function Header({ setRoute, wishlistLength, cartlistLength }) {
    const { productFilterDispatch } = useProduct();

    const [searchInput, setSearchInput] = useState("")

    function searchProductList(e) {
        e.preventDefault();
        console.log(searchInput)
        productFilterDispatch({ type: "SEARCH", payload: searchInput });
        setRoute("productListing");

    }

    return (
        <nav className="header">
            <div className="brand-section">
                <h1 onClick={() => setRoute("home")}>Grab Store</h1>
            </div>
            <div className="brand-logo" onClick={() => setRoute("home")}>
                <h1>GS</h1>
            </div>
            <div className="div-search">
                <form className="form-div-search" onSubmit={(e) => searchProductList(e)}>
                    <input
                        type="text"
                        placeholder="Search Products Here" width="70"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button className="button-search" >
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
                        <span className="badge-notification2">{wishlistLength}</span>

                    </li>

                    <li className="inventory-list-item">

                        <span
                            className="material-icons icons"
                            onClick={() => setRoute("cart")}

                        >
                            shopping_cart
                            </span>
                        <span className="badge-notification2">{cartlistLength}</span>

                    </li>
                </ul>
            </div>
        </nav>

    );
}