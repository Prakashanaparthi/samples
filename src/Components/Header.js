import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Header.css';
import logo from './images/pngegg (2).png';
import items from './products';
import last from './images/five.png';
import last2 from './images/free.png';
import insta  from './images/instagram_2111463.png'
import facebook from './images/facebook_5968764.png'
import whatsapp from './images/whatsapp_733585.png'


function Header() {
    const [images, setImages] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);

        const storedWishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        setWishlistItems(storedWishlistItems);

        if (items) {
            setImages(items);
        }
    }, []);

    const addToCart = (item) => {
        const itemIndex = cartItems.findIndex((cartItem) => cartItem.name === item.name);

        if (itemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[itemIndex].count += 1;
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        } else {
            const updatedCartItems = [...cartItems, { ...item, count: 1 }];
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }

        toast.success(`${item.name} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const toggleWishlist = (item) => {
        const itemIndex = wishlistItems.findIndex((wishlistItem) => wishlistItem.name === item.name);

        if (itemIndex !== -1) {
            const updatedWishlistItems = wishlistItems.filter((wishlistItem) => wishlistItem.name !== item.name);
            setWishlistItems(updatedWishlistItems);
            localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
        } else {
            const updatedWishlistItems = [...wishlistItems, item];
            setWishlistItems(updatedWishlistItems);
            localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
        }
    };

    const isInWishlist = (item) => {
        return wishlistItems.some((wishlistItem) => wishlistItem.name === item.name);
    };

    return (
        <div className='fullpage'>
            <ToastContainer />
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </div>
                <div className="navbar-middle">
                    <ul className="navbar-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Ready To Eat</Link></li>
                        <li><Link to="/about">Spices & Masalas</Link></li>
                        <li><Link to="/contact">Pickles</Link></li>
                        <li><Link to="/track-order">Track Order</Link></li>
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
                        <Link to="/login">
                            <FontAwesomeIcon icon={faUser} className="navbar-icon" />
                        </Link>
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
                {images && images.map((item, index) => {
                    const isLiked = isInWishlist(item);
                    return (
                        <div className='products' key={index}>
                            <div className='PImgc'>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`icon ${isLiked ? 'liked' : ''}`}
                                    onClick={() => toggleWishlist(item)}
                                />
                                <img className='product' src={item.img} alt={item.name} />
                                <div className='colum'>
                                    <p className='priceTag'>Name: <span>{item.name}</span></p>
                                    <p className='priceTag'>Price: <span>{item.price}</span></p>
                                    <button className='productsBtn' onClick={() => addToCart(item)}>ADD TO CART</button>
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
                <div className='section5part1'>
                    <input className='footersearch' placeholder='Search' type='search'></input>
                    <button className='footerSearchBtn'>Search</button>
                    <div className='footerIconsC'>
                        <div className='footerIconC'>
                            <img className='socialIcons' src={insta}/>
                        </div>
                        <div className='footerIconC'>
                            <img className='socialIcons' src={whatsapp}/>
                        </div>
                        <div className='footerIconC'>
                            <img className='socialIcons' src={facebook}/>
                        </div>
                    </div>
                </div>
                <div className='section5part2'>
                        <div className='section5part2Parts'>
                            <h1 className='section5Headings'>Categories</h1>
                            <p className='section5par'>BreakFast Essentials</p>
                            <p className='section5par'>Meals in Minutes</p>
                            <p className='section5par'>Beverages</p>
                        </div>
                        <hr className='hrline' ></hr>
                        <div className='section5part2Parts'>
                            <h1 className='section5Headings'>Policies</h1>
                            <p className='section5par'>Terms and Conditions</p>
                            <p className='section5par'>Privacy Policy</p>
                            <p className='section5par'>Cancelations and Return</p>
                            <p className='section5par'>Shipping Fees and Delivery</p>
                        </div>
                        <hr className='hrline' ></hr>
                        <div className='section5part2Parts'>
                            <h1 className='section5Headings'>Help</h1>
                            <p className='section5par'>Payments</p>
                            <p className='section5par'>Shipping Fees and Delivery</p>
                            <p className='section5par'>Track Order</p>
                        </div>
                </div>
            </footer>
        </div>
    );
}

export default Header;
