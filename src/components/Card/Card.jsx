import axios from "axios"

export function Card({ product, getColor, isItemInWishList, isItemInCart, cartList, wishList, dispatch }) {

    async function addToCart() {
        const response = await axios.post('https://ecommerce.shahazad.repl.co/cart', { _id: product._id, quantity: 1 })
        console.log(response.data);
        dispatch({
            type: "ADD_TO_CART",
            payload: product
        })
    }

    function addToWishList() {
        dispatch({ type: "ADD_TO_WISHLIST", payload: product })
    }

    async function handleAddToWishlist() {
        isItemInWishList(wishList, product._id)

            ? addToCart()

            : addToWishList()
    }

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
                        onClick={handleAddToWishlist}
                    >
                        favorite
                </span>
                </div>
                <p className="card-text">{product.material}</p>
                <h4 className="heading price"><span>&#8377;{product.price}</span></h4>

                {isItemInCart(cartList, product._id) ? (
                    <button className="btn btn-secondary btn-disabled" disabled>
                        <span>Added</span>
                        <span className="material-icons added-icon ">check_circle</span>
                    </button>
                ) : (
                    <button
                        className="btn btn-primary"
                        onClick={addToCart}

                    >
                        Add To Cart
                    </button>
                )}
            </div>
        </div>
    )
}