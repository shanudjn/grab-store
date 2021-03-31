import { createContext, useContext } from 'react';
import data from '../data';

const ProductContext = createContext();

const productList = data;

export function ProductsProvider({ children }) {
    return <ProductContext.Provider value={{ productList }}>
        {children}
    </ProductContext.Provider>
}

export function useProduct() {
    return useContext(ProductContext);
}