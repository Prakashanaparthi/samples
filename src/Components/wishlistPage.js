import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './wishlist.css';

function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve wishlist items from local storage on component mount
        const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        setWishlistItems(storedWishlistItems);
    }, []);

    const toggleLike = (index) => {
        const updatedWishlist = [...wishlistItems];
        updatedWishlist[index].liked = !updatedWishlist[index].liked;
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    };

    const removeFromWishlist = (index) => {
        const updatedWishlist = [...wishlistItems];
        updatedWishlist.splice(index, 1);
        setWishlistItems(updatedWishlist);
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    };

    return (
        <>
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
                                    className={`like-button ${item.liked ? 'liked' : ''}`}
                                    onClick={() => toggleLike(index)}
                                >
                                    {item.liked ? 'Liked!' : 'Like'}
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
