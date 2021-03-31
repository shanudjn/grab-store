import { createContext, useContext, useReducer } from 'react';
import data from '../data';

const ProductContext = createContext();

const productList = data;





export function ProductsProvider({ children }) {

    function productReducer(state, action) {
        switch (action) {
            case "SORT_BY":

                return { ...state, sortBy: action.payload }

            default:
                return state;
        }
    }

    const [{ showAllInventory, showFastDelivery, sortBy }, productFilterDispatch] = useReducer(productReducer, { showAllInventory: true, showFastDelivery: false, sortBy: null })


    return <ProductContext.Provider value={{ productList, productFilterDispatch }}>
        {children}
    </ProductContext.Provider>
}

export function useProduct() {
    return useContext(ProductContext);
}