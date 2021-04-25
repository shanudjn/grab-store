// export function cartReducer() {
//    
export function cartAndWishlistReducer(state, action) {
    console.log("inside dispatch");
    switch (action.type) {
        case "SET_CART":
            return {
                ...state,
                cartList: [...action.payload]
            }
        case "SET_WISHLIST":
            return {
                ...state,
                wishList: [...action.payload]
            }

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
            console.log("inside add to wishlist", action.payload);
            return {
                ...state,
                wishList: state.wishList.concat(action.payload)
            };
        case "REMOVE_FROM_WISHLIST":
            console.log(action.payload);

            return {
                ...state,
                wishList: state.wishList.filter(
                    (wishListItem) => wishListItem._id !== action.payload._id
                )
            };

        case "ADD_TO_CART_FROM_WISHLIST":
            console.log(action.payload);
            return {
                ...state,
                cartList: [...state.cartList, { ...action.payload, quantity: 1 }],
                wishList: state.wishList.filter(
                    (wishListItem) => wishListItem._id !== action.payload._id
                )
            };
        case "REMOVE_FROM_CART":
            console.log(action.payload);
            return {
                ...state,
                cartList: state.cartList.filter(
                    (cartListItem) => cartListItem._id !== action.payload._id
                )
            };
        case "ADD_TO_WISHLIST_FROM_CART":
            return {
                ...state,
                cartList: state.cartList.filter(
                    (cartListItem) => cartListItem._id !== action.payload._id
                ),
                wishList: [...state.wishList, action.payload]
            };

        case "INCREASE_QUANTITY":
            console.log("Inside sec", action.payload);
            return {
                ...state,
                cartList: state.cartList.map((cartListItem) =>
                    cartListItem._id === action.payload._id
                        ? { ...cartListItem, quantity: cartListItem.quantity + 1 }
                        : { ...cartListItem }
                )
            };
        case "DECREASE_QUANTITY":
            console.log("Inside sec", action.payload);
            return {
                ...state,
                cartList: state.cartList.map((cartListItem) =>
                    cartListItem._id === action.payload._id
                        ? { ...cartListItem, quantity: (cartListItem.quantity > 1) ? cartListItem.quantity - 1 : 1 }
                        : { ...cartListItem }
                )
            };

        default:
            break;
    }
}


