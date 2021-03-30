import './wishlist.css';
import { useCart } from '../../context/cart-context';

export function Wishlist() {
    const { wishList, dispatch } = useCart();
    return (
        <>
            <div className="cart-listing">
                {wishList.map((product) => (
                    <div className="card card-badge" key={product.id}>
                        <img src={product.image} alt="pic" />

                        <div className="product-details">
                            <div className="div-brand-name">
                                <p className="card-text">{product.name}</p>
                                <span
                                    className="material-icons icons icon-cancel"
                                    onClick={() =>
                                        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product })
                                    }
                                >
                                    cancel
                                </span>
                            </div>
                            <p className="price">Rs.{product.price}</p>
                            <p className="card-text">{product.material}</p>
                            <button
                                className="btn btn-primary btn-add"
                                onClick={() =>
                                    dispatch({
                                        type: "ADD_TO_CART_FROM_WISHLIST",
                                        payload: product
                                    })
                                }
                            >
                                Buy
                </button>
                        </div>


                    </div>
                ))}
            </div>
        </>
    );
}