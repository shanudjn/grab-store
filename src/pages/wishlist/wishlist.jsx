import './wishlist.css';
import { useCart } from '../../context/cart-context';
import { useAuth } from '../../context/auth-context';
import axios from "axios"


function isItemInCart(cartList, id) {
    const index = cartList.findIndex((cartListItem) => cartListItem._id === id);
    if (index !== -1) {
        return true;
    }
    return false;
}



export function Wishlist() {
    const { wishList, cartList, dispatch } = useCart();
    const { userId } = useAuth();

    async function handleAddToCart(product) {
        if (isItemInCart(cartList, product._id) === false) {
            console.log("Item was not in cart")
            console.log(userId)
            const response = await axios.post(`https://ecommerce-backend-dz7d.onrender.com/user/${userId}/product/${product._id}`);
            console.log(response.data);
            console.log(product)
            // dispatch({
            //     type: "ADD_TO_CART",
            //     payload: product
            // })
            dispatch({
                type: "ADD_TO_CART_FROM_WISHLIST",
                payload: product
            })
            handleRemoveFromWishlist(product)
        }
        else {
            dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product })

        }

    }
    async function handleRemoveFromWishlist(product) {
        try {
            const response = await axios.delete(`https://ecommerce-backend-dz7d.onrender.com/user/${userId}/wishlist/${product._id}`)
            if (response.status === 202) {
                console.log(response)
                const updatedWishlist = response.data.user.wishlist
                console.log(updatedWishlist)
                dispatch({ type: "SET_WISHLIST", payload: updatedWishlist })

                // dispatch({ type: "" })
            }
            // dispatch({ type: "REMOVE_FROM_CART", payload: product })
        } catch (error) {
            console.log(error)
        }
    }

    console.log(wishList)
    return (
        <>
            {
                (wishList.length === 0) && <p style={{ "margin-top": "5rem" }}>There are no items in wishlist.</p>
            }
            <div className="div-cart-listing">
                {wishList.map((product) => (
                    <div className="card card-badge" key={product._id}>
                        <img src={product.image} alt="pic" />

                        <div className="product-details">
                            <div className="div-brand-name">
                                <p className="card-text">{product.name}</p>
                                <span
                                    className="material-icons icons icon-cancel"
                                    onClick={() =>
                                        handleRemoveFromWishlist(product)
                                    }
                                >
                                    cancel
                                </span>
                            </div>
                            <p className="price">Rs.{product.price}</p>
                            <p className="card-text">{product.material}</p>
                            <button
                                className="btn btn-primary btn-add"
                                onClick={() => handleAddToCart(product)}

                            >
                                Buy
                            </button>
                        </div>


                    </div>
                ))}

            </div>
        </>
    );
}