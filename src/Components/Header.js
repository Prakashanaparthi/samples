import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header.css';
import logo from './images/pngegg (2).png';
import items from './products';
import last from './images/five.png';
import last2 from './images/free.png';

function Header() {
    const [images, setImages] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        // Load cart items from local storage on component mount
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);

        // Load wishlist items from local storage on component mount
        const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        setWishlistItems(storedWishlistItems);

        // Load products
        if (items) {
            setImages(items);
        }
    }, []);

    // Function to add item to cart
    const addToCart = (item) => {
        const itemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);

        if (itemIndex !== -1) {
            // Item already exists in cart, update the count
            const updatedCartItems = [...cartItems];
            updatedCartItems[itemIndex].count += 1;
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
            // Item does not exist in cart, add with count 1
            const updatedCartItems = [...cartItems, { ...item, count: 1 }];
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
    };

    // Function to add item to wishlist
    const addToWishlist = (item) => {
        const itemIndex = wishlistItems.findIndex((wishlistItem) => wishlistItem.name === item.name);

        if (itemIndex === -1) {
            // Item does not exist in wishlist, add it
            const updatedWishlistItems = [...wishlistItems, item];
            setWishlistItems(updatedWishlistItems);
            localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
        }
    };

    return (
        <div className='fullpage'>
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </div>
                <div className="navbar-middle">
                    <ul className="navbar-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Ready To Eat</a></li>
                        <li><a href="/about">Spices & Masalas</a></li>
                        <li><a href="/contact">Pickles</a></li>
                        <li><a href="/contact">Track Order</a></li>
                    </ul>
                    <div className='row'>
                        <input className='searchBar' type='search' placeholder='SEARCH' />
                        <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
                    </div>   
                </div>
                <div className="navbar-right">
                    <div className='naviconsBg'>
                        <Link to="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} className="navbar-icon" />
                            <span className="cart-count">{cartItems.reduce((total, item) => total + item.count, 0)}</span>
                        </Link>
                    </div>
                    <div className='naviconsBg'>
                        <Link to="/wishlist">
                            <FontAwesomeIcon icon={faHeart} className="navbar-icon" />
                            <span className="wishlist-count">{wishlistItems.length}</span>
                        </Link>
                    </div>
                    <div className='naviconsBg'>
                        <FontAwesomeIcon icon={faUser} className="navbar-icon" />
                    </div>
                </div>
            </nav>

            <div className='section1'>
                <img src='https://kapilanandagro.com/wp-content/uploads/2023/04/Pickles.jpg' className='section1Img' alt="Pickles Section" />
            </div>
            <h1 className='name'>
                PICKLES
            </h1>
            <div className='section2'>
                {images && images.map((item1, index) => {
                    return (
                        <div className='products' key={index}>
                            <div className='PImgc'>
                                <img className='product' src={item1.img} alt={item1.name} />
                                <div className='colum'>
                                    <p className='priceTag'>Name:<span>{item1.name}</span></p>   
                                    <p className='priceTag'>Price:<span>{item1.price}</span></p>   
                                    <button className='productsBtn' onClick={() => addToCart(item1)}>ADD TO CART</button>
                                    <button className='productsBtn' onClick={() => addToWishlist(item1)}>WISHLIST</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <hr className='hrLine'></hr>
            <h1 className='section3'>WHY SHOULD YOU BUY FROM US</h1>
            <div className='section4'>
                <div className='aboutc'>
                    <div className='about'>
                        <img className='aboutImages' src={last} alt="Quality Ingredients" />
                        <h1 className='section3'>QUALITY INGREDIENTS</h1>
                    </div>
                    <div className='about'>
                        <img className='aboutImages' src={last2} alt="Free Delivery" />
                        <h1 className='section3'>FREE DELIVERY</h1>
                    </div>
                </div>
            </div>
            <footer className='section5'>
                <div>
                    <h1>Categories</h1>
                    <p>BreakFast Essentials</p>
                    <p>Meals in Minutes</p>
                    <p>Beverages</p>
                </div>
                <div>
                    <h1>Policies</h1>
                    <p>Terms and Conditions</p>
                    <p>Privacy Policy</p>
                    <p>Cancelations and Return</p>
                    <p>Shipping Fees and Delivery</p>
                </div>
                <div>
                    <h1>Help</h1>
                    <p>Payments</p>
                    <p>Shipping Fees and Delivery</p>
                    <p>Track Order</p>
                </div>
            </footer>
        </div>        
    );
}

export default Header;
