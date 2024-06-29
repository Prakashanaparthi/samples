import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].count += 1;
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cartItems];
        if (updatedCart[index].count > 1) {
            updatedCart[index].count -= 1;
            setCartItems(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.count, 0);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            setShowEmptyCartAlert(true); // Show popup if cart is empty
        } else {
            navigate('/checkout');
        }
    };

    const handleCloseAlert = () => {
        setShowEmptyCartAlert(false); // Close the empty cart popup
    };

    return (
        <div className='cartPageBg'>
            <button className="back-button" onClick={() => window.history.back()}>
                <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
            </button>
            <div className="cart-page">
                <h1 className='heading'>Shopping Cart</h1>
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.length === 0 ? (
                            <p className='empty-cart'>Your cart is empty.</p>
                        ) : (
                            <ul className='styles'>
                                {cartItems.map((item, index) => (
                                    <li key={index}>
                                        <div className="cart-item">
                                            <div className="cart-item-details">
                                                
                                                <div className='boxes'>
                                                    <img className='img' src={item.img} alt={item.name} />
                                                </div>
                                                <div className='boxes'>
                                                    <h1 className='productNames'>{item.name}</h1>
                                                </div>
                                                <div className='boxes'>
                                                    <h1 className='productNames'>${item.price}</h1>
                                                </div>
                                                <div className='boxes quantity-box'>
                                                    <button className="quantity-button" onClick={() => decreaseQuantity(index)}>-</button>
                                                    <span className='productNames quantity'>{item.count}</span>
                                                    <button className="quantity-button" onClick={() => increaseQuantity(index)}>+</button>
                                                </div>
                                                <div className='box'>
                                                    <button className="remove-button" onClick={() => removeFromCart(index)}>X</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="summary">
                        <h2 className='summary-heading'>Order Summary</h2>
                        <div className="summary-details">
                            <p>Total Items: {cartItems.reduce((total, item) => total + item.count, 0)}</p>
                            <p>Total Price: ${calculateTotal().toFixed(2)}</p>
                        </div>
                        <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>

            {/* Popup for empty cart message */}
            {showEmptyCartAlert && (
                <div className="popup">
                    <div className="popup-content">
                        <p>You cannot proceed to checkout with an empty cart. Please shop some items first.</p>
                        <button className="close-btn" onClick={handleCloseAlert}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
