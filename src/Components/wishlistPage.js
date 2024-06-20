import React, { useEffect, useState } from 'react';
import './wishlist.css'

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
            <h1 className='heading'>Wishlist Items</h1>
            <div className="wishlist-items">
                {wishlistItems.length === 0 ? (
                    <p className='heading'>Your wishlist is empty.</p>
                    
                ) : (
                    <ul>
                        <div className='column'>
                            <h1>image</h1>
                            <h1>Name</h1>
                            <h1>Price</h1>
                            <h1>Remove</h1>
                        </div>
                        {wishlistItems.map((item, index) => (
                            <li key={index}>
                                <div className="wishlist-item">
                                    <div className="wishlist-item-details">
                                        <div className='border'>
                                        <img className='wishlistImg' src={item.img}/>
                                        </div>
                                        <div className='border'>
                                        <h3 className='productNames'>{item.name}</h3>
                                        </div>
                                        <div className='border'>
                                        <p className='productNames'>Price: ${item.price}</p>
                                        </div>
                                        <div className='border'>
                                        <button className='wishListBtn' onClick={() => removeFromWishlist(index)}>Remove</button>
                                        </div>
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

export default WishlistPage;
