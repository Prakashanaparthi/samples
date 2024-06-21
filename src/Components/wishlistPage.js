import React, { useEffect, useState } from 'react';
import './wishlist.css';

function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        // Retrieve wishlist items from local storage on component mount
        const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems'));
        if (storedWishlistItems) {
            setWishlistItems(storedWishlistItems);
        }
    }, []);

    const removeFromWishlist = (index) => {
        const updatedWishlist = [...wishlistItems];
        updatedWishlist.splice(index, 1); // Remove item at index
        setWishlistItems(updatedWishlist);
        // Update local storage
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    };

    return (
        <div className="wishlist-container">
            <h1 className='heading'>Wishlist</h1>
            <div className="wishlist-items">
                {wishlistItems.length === 0 ? (
                    <p className='empty-wishlist'>Your wishlist is empty.</p>
                ) : (
                    <ul className='wishlist-list'>
                        {wishlistItems.map((item, index) => (
                            <li key={index} className="wishlist-item">
                                <img className='wishlist-img' src={item.img} alt={item.name} />
                                <div className='wishlist-details'>
                                    <h3 className='wishlist-name'>{item.name}</h3>
                                    <p className='wishlist-price'>${item.price}</p>
                                    <button className='wishlist-remove' onClick={() => removeFromWishlist(index)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default WishlistPage;
