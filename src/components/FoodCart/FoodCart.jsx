import React, { useEffect } from "react";
import { useAuth } from "hooks/use-auth"
import { Navigate, useNavigate } from "react-router-dom";
import './FoodCart.css'; // Import your CSS file
import { useCart, usePrevOrders } from "hooks/api_hooks";
import Loader from "components/Loader/Loader";

function FoodCart() {
    const { isAuth } = useAuth();

    const { order, handleRemoveItem, handleAccept, isLoaded } = useCart();
    const { prevOrders, isLoaded: prevIsLoaded } = usePrevOrders();

    // useEffect(() => {
    //     console.log(isLoaded)
    // }, [isLoaded]);

    const navigate = useNavigate()

    const onConfirmAction = () => {
        if (window.confirm("You sure you want to confirm?")) {
            handleAccept()
            navigate("/")
        }
    }

    return isAuth ? (

        <>
            {(!isLoaded || !order) &&
                <Loader />
            }
            {order &&
                <>
                    {order.order_items.length === 0 &&
                        <div className="cart-list empty-cart-message">Your cart is empty</div>
                    }
                    {order.order_items.length > 0 &&
                        <>
                            <div className="cart-list">
                                <h2>Your Cart</h2>
                                <ul>
                                    {order.order_items.map((item, index) => (
                                        <li key={index} className="cart-item">
                                            <img src={item.photo} alt={item.name} className="cart-item-image" />
                                            <div className="cart-item-details">
                                                <h3 className="cart-item-name">{item.name}</h3>
                                                <p className="cart-item-price">{item.price.toFixed(2)}T</p>
                                                <button
                                                    className="remove-button"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="cart-total">
                                    <p>Total Price: {order.counted_price.toFixed(2)}T</p>
                                </div>
                                <button className="confirm-button" onClick={onConfirmAction}>Confirm Order</button>
                            </div>
                        </>
                    }
                </>
            }
            {(isLoaded && prevIsLoaded && prevOrders && prevOrders.length > 0) && <div className="cart-list">
                <h3 style={{ margin: "0px" }}>Previous Orders</h3>
                {prevOrders.map((order) =>
                    <div className="prevOrder">
                        <div className="prevOrderId">{order.id}</div>
                        <div className="prevOrderStatus">{order.status}</div>
                        <div className="prevOrderImages">
                        {order.order_items.map((item => 
                            <img key={item.id} className="prevOrderImg" src={item.photo} />
                        ))}
                        </div>
                        <div className="prevOrderPrice">{order.counted_price}₸</div>
                    </div>
                )}
            </div>}
        </>) : (<Navigate to="/login" />)
}

export default FoodCart