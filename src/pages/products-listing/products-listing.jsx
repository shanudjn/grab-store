import './products-listing.css';
//import data from '../../data';
import { Card } from '../../components/Card/Card';
import { Filter } from '../../components/Filters/Filter'

import { useCart } from '../../context/cart-context';
import { useProduct } from '../../context/product-context';

export function ProductListing() {

    const { cartList, wishList, dispatch } = useCart();
    const { productList, sortBy, showAllInventory,
        showFastDelivery, searchTerm, productFilterDispatch } = useProduct();

    function getColor(wishList, id) {
        const index = wishList.findIndex((wishlistItem) => wishlistItem.id === id);
        if (index !== -1) {
            return "#F87171";
        }
        return "#E5E7EB";
    }
    function isItemInWishList(wishList, id) {
        const index = wishList.findIndex((wishlistItem) => wishlistItem.id === id);
        if (index !== -1) {
            return true;
        }
        return false;
    }
    function isItemInCart(cartList, id) {
        const index = cartList.findIndex((wishlistItem) => wishlistItem.id === id);
        if (index !== -1) {
            return true;
        }
        return false;
    }

    function getSortedData(productList, sortBy) {
        if (sortBy === "HIGH_TO_LOW") {
            console.log("sorting:high to low")
            return productList.sort((a, b) => b.price - a.price)
        }
        if (sortBy === "LOW_TO_HIGH") {
            console.log("sorting:low to high")
            return productList.sort((a, b) => a.price - b.price)
        }
        return productList;
    }
    function getFilteredData(sortedData, { showAllInventory, showFastDelivery }) {
        console.log("returning filtered data")
        return sortedData
            .filter(({ fastDelivery }) => showFastDelivery ? fastDelivery : true)
            .filter(({ inStock }) => showAllInventory ? true : inStock)
    }

    function getSearchedData(productList, searchTerm) {
        return productList.filter(item => {
            if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) === true)
                return item
            return null
        })
    }

    const searchedData = getSearchedData(productList, searchTerm);

    const sortedData = getSortedData(searchedData, sortBy);

    const filteredData = getFilteredData(sortedData, { showAllInventory, showFastDelivery });

    console.log(filteredData);

    return (
        <>
            <div className="product-section">
                <Filter sortBy={sortBy} showAllInventory={showAllInventory} showFastDelivery={showFastDelivery} productFilterDispatch={productFilterDispatch} />
                <div className="list-filter-button">
                    <div className="product-listing">
                        {filteredData.map((product) => (
                            <Card key={product.id} product={product} getColor={getColor} isItemInWishList={isItemInWishList} isItemInCart={isItemInCart}
                                cartList={cartList} wishList={wishList} dispatch={dispatch} />
                        ))}
                    </div>
                    {/* <div className="filter-button">
                        <button>Filter</button>
                        <button>Sort</button>
                    </div> */}
                </div>

            </div>
        </>
    )
}