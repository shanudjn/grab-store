import { createContext, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import data from '../data';

const ProductContext = createContext();

const productList = data;

const getData = async () => {
    console.log("inside getdata")
    try {
        const response = await axios.get('/api/products');
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}


export function ProductsProvider({ children }) {



    useEffect(() => {
        getData()
    }, [])

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
            case "SEARCH":
                console.log("inside search switch case", action.payload)
                return { ...state, searchTerm: action.payload }
            // case "CLEAR_FILTERS":
            //     console.log("clearing all filters")
            //     return { ...state }
            default:
                return state;
        }
    }
    const [{ showAllInventory, showFastDelivery, sortBy, searchTerm }, productFilterDispatch] = useReducer(productReducer, { showAllInventory: true, showFastDelivery: false, sortBy: null, searchTerm: "a" });



    return <ProductContext.Provider value={{
        productList, sortBy,
        showAllInventory, showFastDelivery, searchTerm, productFilterDispatch
    }}>
        {children}
    </ProductContext.Provider>
}

export function useProduct() {
    return useContext(ProductContext);
}