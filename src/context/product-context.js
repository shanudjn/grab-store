import { createContext, useContext, useReducer } from 'react';
import data from '../data';

const ProductContext = createContext();

const productList = data;





export function ProductsProvider({ children }) {

    function productReducer(state, action) {
        console.log("inside reducer")
        switch (action.type) {
            case "SORT":
                console.log("Inside Sort Reducer")
                return { ...state, sortBy: action.payload }
            case "TOGGLE_DELIVERY":
                return { ...state, showFastDelivery: !state.showFastDelivery }
            case "TOGGLE_INVENTORY":
                return { ...state, showAllInventory: !state.showAllInventory }
            default:
                return state;
        }
    }
    const [{ showAllInventory, showFastDelivery, sortBy }, productFilterDispatch] = useReducer(productReducer, { showAllInventory: true, showFastDelivery: false, sortBy: null });



    return <ProductContext.Provider value={{ productList, sortBy, showAllInventory, showFastDelivery, productFilterDispatch }}>
        {children}
    </ProductContext.Provider>
}

export function useProduct() {
    return useContext(ProductContext);
}