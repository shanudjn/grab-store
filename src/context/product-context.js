import { createContext, useEffect, useContext, useReducer, useState } from 'react';
import axios from 'axios';
// import data from '../data';

const ProductContext = createContext();

export function ProductsProvider({ children }) {
    const [productList, setProductList] = useState([]);

    const getData = async () => {
        try {
            const { data: { products } } = await axios.get("https://ecommerce.shahazad.repl.co/products");

            setProductList(products)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getData();
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

            default:
                return state;
        }
    }
    const [{ showAllInventory, showFastDelivery, sortBy, searchTerm }, productFilterDispatch] = useReducer(productReducer,
        { showAllInventory: true, showFastDelivery: false, sortBy: null, searchTerm: "" });



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