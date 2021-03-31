import './products-listing.css';
//import data from '../../data';

import { useCart } from '../../context/cart-context';
import { useProduct } from '../../context/product-context';

export function ProductListing() {

    const { cartList, wishList, dispatch } = useCart();
    const { productList, sortBy, showAllInventory, showFastDelivery, productFilterDispatch } = useProduct();

    function getColor(wishList, id) {
        const index = wishList.findIndex((wishlistItem) => wishlistItem.id === id);
        if (index !== -1) {
            return "#F87171";
        }
        return "#9CA3AF";
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

    function getSortedData(productList, sortBy) {
        if (sortBy === "HIGH_TO_LOW") {
            console.log("sorting:high to low")
            return productList.sort((a, b) => b["price"] - a["price"])
        }
        if (sortBy === "LOW_TO_HIGH") {
            console.log("sorting:low to high")
            return productList.sort((a, b) => a["price"] - b["price"])
        }
        return productList;
    }
    function getFilteredData(sortedData, { showAllInventory, showFastDelivery }) {
        console.log("returning filtered data")
        return sortedData
            .filter(({ fastDelivery }) => showFastDelivery ? fastDelivery : true)
            .filter(({ inStock }) => showAllInventory ? true : inStock)
    }
    const sortedData = getSortedData(productList, sortBy);

    const filteredData = getFilteredData(sortedData, { showAllInventory, showFastDelivery })

    console.log(filteredData);

    return (
        <>
            <div className="product-section">
                <div className="div-sidebar">
                    <aside>
                        <p className="filter-heading">Sort By</p>
                        <label>
                            <input
                                type="radio"
                                name="sort"
                                onChange={() => productFilterDispatch({ type: "SORT", payload: "HIGH_TO_LOW" })}
                                checked={sortBy === "HIGH_TO_LOW"}
                            />
                            Price High to Low
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sort"
                                onChange={() => productFilterDispatch({ type: "SORT", payload: "LOW_TO_HIGH" })}
                                checked={sortBy === "LOW_TO_HIGH"}
                            />
                            Price Low to High
                        </label>
                        <p className="filter-heading">Filters</p>

                        <label>
                            <input
                                type="checkbox"
                                checked={showAllInventory}
                                onChange={() => productFilterDispatch({ type: "TOGGLE_INVENTORY" })}
                            />
            Include Out of Stock
          </label>

                        <label>
                            <input
                                type="checkbox"
                                checked={showFastDelivery}
                                onChange={() => productFilterDispatch({ type: "TOGGLE_DELIVERY" })}
                            />
                            Fast Delivery Only
          </label>
                    </aside>
                </div>
                <div className="product-listing">
                    {filteredData.map((product) => (
                        <div className="card card-badge" key={product.id}>
                            <img src={product.image} alt="pic" />

                            <div className="card-content">
                                <div className="div-brand-name">
                                    <p className="para-price">{product.name}</p>
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
                                        favorite_border
                                    </span>
                                </div>
                                <p className="card-text">{product.material}</p>
                                <h4 className="heading price"><span>&#8377;{product.price}</span></h4>

                                {isItemInCart(cartList, product.id) ? (
                                    <button className="btn btn-secondary btn-disabled" disabled>
                                        <span>Added</span>
                                        <span class="material-icons added-icon ">check_circle</span>
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