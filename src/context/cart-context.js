import { createContext, useReducer, useContext } from "react";



const CartContext = createContext();


export function CartProvider({ children }) {
    const cartList = [];
    const wishList = [];

    function cartReducer(state, action) {
        console.log("inside dispatch");
        switch (action.type) {
            case "ADD_TO_CART":
                console.log(action.payload);
                return {
                    ...state,
                    cartList: [...state.cartList, { ...action.payload, quantity: 1 }]
                };
            case "SEARCH_ITEM_IN_CART":
                console.log(action.payload);
                return {
                    ...state,
                    cartList: state.cartList.filter(
                        (cartListItem) => cartListItem.name === action.payload
                    )
                };
            case "ADD_TO_WISHLIST":
                console.log(action.payload);
                return {
                    ...state,
                    wishList: state.wishList.concat(action.payload)
                };
            case "REMOVE_FROM_WISHLIST":
                console.log(action.payload);

                return {
                    ...state,
                    wishList: state.wishList.filter(
                        (wishListItem) => wishListItem.id !== action.payload.id
                    )
                };

            case "ADD_TO_CART_FROM_WISHLIST":
                console.log(action.payload);
                return {
                    ...state,
                    cartList: [...state.cartList, { ...action.payload, quantity: 1 }],
                    wishList: state.wishList.filter(
                        (wishListItem) => wishListItem.id !== action.payload.id
                    )
                };
            case "REMOVE_FROM_CART":
                console.log(action.payload);
                return {
                    ...state,
                    cartList: state.cartList.filter(
                        (cartListItem) => cartListItem.id !== action.payload.id
                    )
                };
            case "ADD_TO_WISHLIST_FROM_CART":
                return {
                    ...state,
                    cartList: state.cartList.filter(
                        (cartListItem) => cartListItem.id !== action.payload.id
                    ),
                    wishList: [...state.wishList, action.payload]
                };

            case "INCREASE_QUANTITY":
                console.log("Inside sec", action.payload);
                return {
                    ...state,
                    cartList: state.cartList.map((cartListItem) =>
                        cartListItem.id === action.payload.id
                            ? { ...cartListItem, quantity: cartListItem.quantity + 1 }
                            : { ...cartListItem }
                    )
                };
            case "DECREASE_QUANTITY":
                console.log("Inside sec", action.payload);
                return {
                    ...state,
                    cartList: state.cartList.map((cartListItem) =>
                        cartListItem.id === action.payload.id
                            ? { ...cartListItem, quantity: cartListItem.quantity - 1 }
                            : { ...cartListItem }
                    )
                };

            default:
                break;
        }
    }

    const [state, dispatch] = useReducer(cartReducer, {
        cartList,
        wishList
    });

    return (
        <CartContext.Provider
            value={{
                cartList: state.cartList,
                wishList: state.wishList,
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

