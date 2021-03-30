import './products-listing.css';
import data from '../../data';

import { useCart } from '../../context/cart-context';

export function ProductListing() {
    console.log(data);
    const { cartList, wishList, dispatch } = useCart();

    function getColor(wishList, id) {
        const index = wishList.findIndex((wishlistItem) => wishlistItem.id === id);
        if (index !== -1) {
            return "red";
        }
        return "green";
    }
    function isItemInWishList(wishList, id) {
        const index = wishList.findIndex((wishlistItem) => wishlistItem.id === id);
        if (index !== -1) {
            return true;
        }
        return false;
    }
    function isItemInCart(cartList, id) {
        const index = cartList.findIndex((wishlistItem) => wishlistItem.id === id);
        if (index !== -1) {
            return true;
        }
        return false;
    }
    return (
        <>
            <div className="product-section">
                <div className="div-sidebar">
                    <aside>
                        <h5>Sort By</h5>
                        <label>
                            <input
                                type="radio"
                                name="sort"
                            />
                            Price High to Low
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sort"
                            />
                            Price Low to High
                        </label>
                        <h5>Filters</h5>

                        <label>
                            <input
                                type="checkbox"

                            />
            Include Out of Stock
          </label>

                        <label>
                            <input
                                type="checkbox"

                            />
            Fast Delivery Only
          </label>
                    </aside>
                </div>
                <div className="product-listing">
                    {data.map((product) => (
                        <div className="card card-badge" key={product.id}>
                            <img src={product.image} alt="pic" />

                            <div className="card-content">
                                <div className="div-brand-name">
                                    <h4 className="card-header">{product.name}</h4>
                                    <span
                                        className="material-icons icons"
                                        style={{
                                            color: getColor(wishList, product.id),
                                            border: "black"
                                        }}
                                        onClick={() =>
                                            isItemInWishList(wishList, product.id)
                                                ? dispatch({
                                                    type: "REMOVE_FROM_WISHLIST",
                                                    payload: product
                                                })
                                                : dispatch({ type: "ADD_TO_WISHLIST", payload: product })
                                        }
                                    >
                                        favorite
                                    </span>
                                </div>
                                <h4 className="heading price">{product.price}</h4>
                                <p className="card-text">{product.material}</p>
                                {isItemInCart(cartList, product.id) ? (
                                    <button className="btn btn-secondary btn-disabled" disabled>
                                        Added
                                        <span class="material-icons ">check_circle</span>
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            dispatch({ type: "ADD_TO_CART", payload: product })
                                        }
                                    >
                                        Add To Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}