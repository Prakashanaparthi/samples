import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './wishlist.css';

function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        setWishlistItems(storedWishlistItems);

        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    const moveToCart = (index) => {
        const item = wishlistItems[index];

        // Check if the item is already in the cart
        const itemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);
        let updatedCartItems;
        if (itemIndex !== -1) {
            updatedCartItems = [...cartItems];
            updatedCartItems[itemIndex].count += 1;
        } else {
            updatedCartItems = [...cartItems, { ...item, count: 1 }];
        }

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

        toast.success(`${item.name} moved to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const removeFromWishlist = (index) => {
        const updatedWishlist = [...wishlistItems];
        updatedWishlist.splice(index, 1);
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    };

    return (
        <>
            <ToastContainer />
            <button className="back-button" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
            </button>
            <div className="wishlist-container">
                <div className="wishlist-items">
                    <header>My Wishlist</header>
                    {wishlistItems.length === 0 ? (
                        <p className='empty-wishlist'>Your wishlist is empty.</p>
                    ) : (
                        <div>
                            {wishlistItems.map((item, index) => (
                                <div className="wishlist-item" key={index}>
                                    <img src={item.img} alt={item.name} />
                                    <div className="product-details">
                                        <h3>{item.name}</h3>
                                        <p>Price: ${item.price}</p>
                                    </div>
                                    <button
                                        className="like-button"
                                        onClick={() => moveToCart(index)}
                                    >
                                        Move to Cart
                                    </button>
                                    <button className="remove-button" onClick={() => removeFromWishlist(index)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default WishlistPage;
