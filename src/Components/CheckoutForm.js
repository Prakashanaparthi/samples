import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBill, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faApple, faPaypal } from '@fortawesome/free-brands-svg-icons';
import './CheckoutPage.css';

function CheckoutForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Checkout Details:', { name, email, address, city, postalCode, paymentMethod });
        navigate('/thank-you');
    };
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.count, 0);
    };

    return (
        <div className="checkout-page-container">
            <div className="checkout-form-container">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h2>Checkout</h2>
                    <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode">Postal Code:</label>
                        <input
                            type="text"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </div>
                    
                </form>
            </div>

            <div className="order-summary-container">
                <h3>Order Summary</h3>
                <div className="cart-items">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.img} alt={item.name} />
                            <div className="item-details">
                                <p>{item.name}</p>
                                <p>Quantity: {item.count}</p>
                                <p>Price: {item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="summary-details">
                            <p>Total Items: {cartItems.reduce((total, item) => total + item.count, 0)}</p>
                            <p>Total Price: ${calculateTotal().toFixed(2)}</p>
                        </div>
                <h3>Select Payment Method</h3>
                <div className="payment-methods">
                    <div className={`payment-method ${paymentMethod === 'creditCard' ? 'selected' : ''}`} onClick={() => setPaymentMethod('creditCard')}>
                        <FontAwesomeIcon icon={faCreditCard} size="2x" />
                        <p>Credit Card</p>
                    </div>
                    <div className={`payment-method ${paymentMethod === 'googlePay' ? 'selected' : ''}`} onClick={() => setPaymentMethod('googlePay')}>
                        <FontAwesomeIcon icon={faGoogle} size="2x" />
                        <p>Google Pay</p>
                    </div>
                    <div className={`payment-method ${paymentMethod === 'phonePe' ? 'selected' : ''}`} onClick={() => setPaymentMethod('phonePe')}>
                        <FontAwesomeIcon icon={faMobileAlt} size="2x" />
                        <p>PhonePe</p>
                    </div>
                    <div className={`payment-method ${paymentMethod === 'paypal' ? 'selected' : ''}`} onClick={() => setPaymentMethod('paypal')}>
                        <FontAwesomeIcon icon={faPaypal} size="2x" />
                        <p>PayPal</p>
                    </div>
                    <div className={`payment-method ${paymentMethod === 'applePay' ? 'selected' : ''}`} onClick={() => setPaymentMethod('applePay')}>
                        <FontAwesomeIcon icon={faApple} size="2x" />
                        <p>Apple Pay</p>
                    </div>
                    <div className={`payment-method ${paymentMethod === 'cash' ? 'selected' : ''}`} onClick={() => setPaymentMethod('cash')}>
                        <FontAwesomeIcon icon={faMoneyBill} size="2x" />
                        <p>Cash on Delivery</p>
                    </div>
                </div>
                <button type="submit" className="checkout-btn">Proceed to Pay</button>
            </div>
        </div>
    );
}

export default CheckoutForm;
