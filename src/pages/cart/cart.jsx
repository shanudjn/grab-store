import './cart.css';
import { useCart } from './../../context/cart-context'

export function Cart() {
    const { cartList, dispatch } = useCart();
    const total = cartList.reduce((accum, item) => {
        return accum + item.quantity * item.price;
    }, 0);
    // console.log("inCart", cartList);
    // console.log(total);
    return (
        <>
            <div className="div-cartlist-invoice">
                <div className="cart-listing-horizontal">
                    {cartList.map((product) => (
                        <div className="card-horizontal" key={product.id}>
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
                                            dispatch({ type: "REMOVE_FROM_CART", payload: product })
                                        }
                                    >
                                        REMOVE
                      </button>
                                    <button
                                        className="button-action"
                                        onClick={() =>
                                            dispatch({
                                                type: "ADD_TO_WISHLIST_FROM_CART",
                                                payload: product
                                            })
                                        }
                                    >
                                        MOVE TO WISHLIST
                      </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="div-invoice">
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
                </div>
            </div>
        </>
    );
}