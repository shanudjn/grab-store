export function Card({ product, getColor, isItemInWishList, isItemInCart, cartList, wishList, dispatch }) {
    return (
        <div className="card card-badge" key={product._id}>
            <img src={product.image} alt="pic" />

            <div className="card-content">
                <div className="div-brand-name">
                    <p className="para-price">{product.name}</p>
                    <span
                        className="material-icons icons"
                        style={{
                            color: getColor(wishList, product._id),
                            border: "black"
                        }}
                        onClick={() =>
                            isItemInWishList(wishList, product._id)
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
    )
}