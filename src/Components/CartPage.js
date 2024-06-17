import React, { useState, useEffect } from 'react';

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

     
    return (
        <div className="cart-container">
            <h1>Cart Items</h1>
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <div className="cart-item">
                                    
                                    <div className="cart-item-details">
                                        <h3>{item.name}</h3>
                                        <p>Price: ${item.price}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <button onClick={() => removeFromCart(index)}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default CartPage;
