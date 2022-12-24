import axios from "axios";
import { useAuth } from '../../context/auth-context';

export function Card({ product, getColor, isItemInWishList, isItemInCart, cartList, wishList, dispatch }) {

    const { userId } = useAuth();

    console.log(userId)

    async function handleAddToCart(product) {
        if (isItemInCart(cartList, product._id) === false) {
            console.log("Item was not in cart")
            console.log(userId)
            const response = await axios.post(`https://ecommerce-backend-dz7d.onrender.com/user/${userId}/product/${product._id}`);
            console.log(response.data);
            console.log(product)
            dispatch({
                type: "ADD_TO_CART",
                payload: product
            })
        }

    }

    async function handleAddToWishlist() {
        if (isItemInWishList(wishList, product._id) === false) {
            console.log("Item was not in wishlist")
            console.log(userId)
            const response = await axios.post(`https://ecommerce-backend-dz7d.onrender.com/user/${userId}/wishlist/${product._id}`);
            console.log(response.data);
            console.log(product)
            dispatch({
                type: "ADD_TO_WISHLIST",
                payload: product
            })
        }
        if (isItemInWishList(wishList, product._id) === true) {
            console.log("Item is in wishlist")
            console.log(userId)
            const response = await axios.delete(`https://ecommerce-backend-dz7d.onrender.com/user/${userId}/wishlist/${product._id}`);
            console.log(response.data);
            console.log(product)
            dispatch({
                type: "REMOVE_FROM_WISHLIST",
                payload: product
            })
        }

        //dispatch({ type: "ADD_TO_WISHLIST", payload: product })
    }

    // function handleAddToWishlist() {
    //     // isItemInWishList(wishList, product._id)
    //     //     ? addToCart()
    //     //     : addToWishList()
    // }

    return (
        <div className="card card-badge" key={product._id} style={{display:"flex", flexDirection:"column",flexGrow:1, justifyContent:"space-between"}}>
            <img src={product.image} alt="pic" />
            <div className="card-content" style={{display:"flex", flexDirection:"column",flexGrow:1, justifyContent:"space-between"}}>
                <div className="div-brand-name">
                    <p className="para-price">{product.name}</p>
                    <span
                        className="material-icons icons"
                        style={{
                            color: getColor(wishList, product._id),
                            // border: "black"
                        }}
                        onClick={() => handleAddToWishlist(product)}
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
                        onClick={() => handleAddToCart(product)}

                    >
                        Add To Cart
                    </button>
                )}
            </div>
        </div>
    )
}