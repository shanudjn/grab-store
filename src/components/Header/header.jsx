import { useState } from 'react';
import { useProduct } from '../../context/product-context';
import { Link } from "react-router-dom";
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
                <Link to="/"><h1 >Grab Store</h1></Link>
            </div>
            <div className="brand-logo" >
                <Link to="/"><h1 >GS</h1></Link>
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
                        <Link to="/wishlist">
                            <span className="material-icons icons">
                                favorite_border
                            </span>
                        </Link>
                        {wishlistLength > 0 && <span className="badge-notification2">{wishlistLength}</span>}
                    </li>

                    <li className="inventory-list-item">
                        <Link to="/cart">
                            <span className="material-icons icons">
                                shopping_cart
                            </span>
                        </Link>
                        {cartlistLength > 0 && <span className="badge-notification2">{cartlistLength}</span>}

                    </li>
                    <li className="inventory-list-item">
                        <Link to="/login">
                            <span className="material-icons icons">
                                login
                            </span>
                        </Link>
                        {/* <span className="badge-notification2">{cartlistLength}</span> */}

                    </li>
                </ul>
            </div>
        </nav>

    );
}