import './cart.css';
// import { useEffect, useState } from "react"
import { useCart } from '../../context/cart-context';
import axios from "axios";
import { useAuth } from '../../context/auth-context';

export function Cart() {
    const { cartList, wishList, dispatch } = useCart();
    const { userId, login } = useAuth();


    function isItemInWishList(wishList, id) {

        const index = wishList.findIndex((wishlistItem) => wishlistItem._id === id);
        if (index !== -1) {
            return true;
        }
        return false;
    }
    const total = cartList.reduce((accum, item) => {
        return accum + item.quantity * item.price;
    }, 0);
    console.log(cartList)

    async function handleRemove(product) {
        console.log("handleRemove")
        try {
            const response = await axios.delete(`https://neog-ecommerce.herokuapp.com/user/${userId}/product/${product._id}`)
            if (response.status === 202) {
                console.log(response)
                const updatedCart = response.data.user.cart
                console.log(updatedCart)
                dispatch({ type: "SET_CART", payload: updatedCart })


            }

        } catch (error) {
            console.log(error)
        }

    }
    async function handleMoveToWishlist(product) {
        if (isItemInWishList(wishList, product._id) === false) {
            console.log("Item was not in wishlist")
            console.log(userId)
            const response = await axios.post(`https://neog-ecommerce.herokuapp.com/user/${userId}/wishlist/${product._id}`);
            console.log(response.data);
            console.log(product)
            dispatch({
                type: "ADD_TO_WISHLIST",
                payload: product
            })
        }

        console.log("Item is in wishlist")
        const response = await axios.delete(`https://neog-ecommerce.herokuapp.com/user/${userId}/product/${product._id}`)
        if (response.status === 202) {
            console.log(response)
            const updatedCart = response.data.user.cart
            console.log(updatedCart)
            dispatch({ type: "SET_CART", payload: updatedCart })

        }

    }

    // async function handleCheckout(total) {
    //     console.log(total)
    //     try {
    //         const paymentResponse = await axios.post('https://api.razorpay.com/v1/orders', {
    //             "amount": total,
    //             "currency": "INR",
    //             "receipt": "receipt#1"
    //         })
    //         console.log(paymentResponse)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <div className="div-cartlist-invoice">
                <div className="cart-listing-horizontal" >
                    {cartList.map((product) => {
                        return (
                            <div className="card-horizontal" key={product._id} >
                                <img src={product.image} alt="pic" />
                                <div className="card-content-horizontal">
                                    <div className="div-brand-name-horizontal">
                                        <p className="card-header-horizontal">
                                            {product.name}
                                        </p>
                                    </div>
                                    <p className="price">Rs.{product.price}</p>
                                    <p className="card-text">{product.material}</p>
                                    <p className="card-text">
                                        Quantity :{" "}
                                        <button
                                            className="button-change-quantity"
                                            onClick={() =>
                                                dispatch({ type: "DECREASE_QUANTITY", payload: product })
                                            }
                                        >
                                            -
                                        </button>
                                        <span className="span-quantity">{product.quantity}</span>
                                        <button
                                            className="button-change-quantity"
                                            onClick={() =>
                                                dispatch({ type: "INCREASE_QUANTITY", payload: product })
                                            }
                                        >
                                            +
                                        </button>
                                    </p>
                                    <div className="div-button-action">
                                        <button
                                            className="button-action"
                                            onClick={() =>
                                                handleRemove(product)
                                            }
                                        >
                                            REMOVE
                                        </button>
                                        <button
                                            className="button-action"
                                            onClick={() =>
                                                handleMoveToWishlist(product)
                                            }
                                        >
                                            MOVE TO WISHLIST
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {(cartList.length > 0) && <div className="div-invoice">
                    <h4 className="price price-detail">Price Details</h4>
                    <ul className="list-invoice">
                        <li className="list-item-invoice">
                            {" "}
                            <p className="card-text">Total MRP : </p>
                            <p className="card-text invoice-price">Rs.{total}</p>
                        </li>
                        <li className="list-item-invoice">
                            {" "}
                            <p className="card-text">Discount : </p>
                            <p className="card-text invoice-price">Rs. 0</p>
                        </li>
                    </ul>
                    <div className="border"></div>
                    <div className="div-invoice-total">
                        <h4 className="">Total : </h4>
                        <h4 className="card-text invoice-price">Rs.{total}</h4>
                    </div>
                    <button
                        className="btn btn-primary btn-add"
                        onClick={() => handleCheckout(total)}

                    >
                        Checkout
                    </button>
                </div>}
                {
                    (cartList.length === 0) && <p style={{ "margin-top": "5rem" }}>There are no items in cart.</p>
                }
            </div>
        </>
    );
}