import './cart.css';
// import { useEffect, useState } from "react"
import { useCart } from '../../context/cart-context';
import axios from "axios";
import { useAuth } from '../../context/auth-context';
import { loadScript } from '../../utils/paymentUtils';

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

    async function handleCheckout(total) {
        console.log(total)
        const response = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!response) {
            console.log("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // const newOrder = await axios.post("http://localhost:8080/payment/orders", { amount: total * 100 })
        const newOrder = await axios.post("https://neog-ecommerce.herokuapp.com/payment/orders", { amount: total * 100 })

        if (!newOrder) {
            console.log("Server error. Are you online?");
            return;
        }
        console.log(newOrder.data)
        const { amount, id: order_id, currency } = newOrder.data;


        var options = {
            "key": "rzp_test_RygIasGLM6cVia", // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": currency,

            "description": "Test Transaction",

            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                // const result = await axios.post("http://localhost:8080/payment/success", data);
                const result = await axios.post("https://neog-ecommerce.herokuapp.com/success", data);


                alert(result.data.msg);
                console.log(result);

            },

        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open()
    }

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