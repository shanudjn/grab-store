import { createContext, useReducer, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./auth-context";
import { cartAndWishlistReducer } from '../reducer/cart-wishlist-reducer'



const CartContext = createContext();

export function CartProvider({ children }) {

    const { login, userId } = useAuth();
    // const [cartList, setCartList] = useState([]);
    // const [wishList, setWishList] = useState([]);

    const getCartListAndWishListData = async () => {
        try {
            const userCartDetails = await axios.get(`https://ecommerce.shahazad.repl.co/user/${userId}`);
            //{ data: { user: { cart } } }
            // console.log()
            const cartData = userCartDetails.data.user.cart
            const wishListData = userCartDetails.data.user.wishlist
            // console.log({ ...cart })
            //console.log({ cartData })
            // setCartList(cart)
            dispatch({ type: "SET_CART", payload: cartData })
            dispatch({ type: "SET_WISHLIST", payload: wishListData })

        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {

        getCartListAndWishListData();

    }, [login])




    const [{ cartList, wishList }, dispatch] = useReducer(cartAndWishlistReducer, { cartList: [], wishList: [] });
    //console.log(state.cartList)
    return (
        <CartContext.Provider
            value={{
                cartList,
                wishList,
                dispatch,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

