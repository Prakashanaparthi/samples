import React, { useState, useEffect } from 'react';
import './CartPage.css';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Retrieve cart items from local storage on component mount
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1); // Remove item at index
        setCartItems(updatedCart);
        // Update local storage
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.count, 0);
    };

    return (
        <div className="cart-container">
            <h1 className='heading'>Cart Items</h1>
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p className='heading2'>Your cart is empty.</p>
                ) : (
                    <div>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index}>
                                    <div className="cart-item">
                                        <div className="cart-item-details">
                                            <h3 className='productNames'>{item.name}</h3>
                                            <p className='productNames'>Price: ${item.price}</p>
                                            <p className='productNames'>Quantity: {item.count}</p>
                                            <button onClick={() => removeFromCart(index)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="total">
                            <h2>Total: ${calculateTotal().toFixed(2)}</h2>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;
