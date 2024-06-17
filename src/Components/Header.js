import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from './images/pngegg (2).png';
import items from './products';
import last from './images/five.png'
import last2 from './images/free.png'

function Header() {
    const [images, setImages] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Load cart items from local storage on component mount
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }

        // Load products
        if (items) {
            setImages(items);
        }
    }, []);

    // Function to add item to cart
    const addToCart = (item) => {
        const itemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);

        if (itemIndex !== -1) {
            // Item already exists in cart, increase count
            const updatedCartItems = [...cartItems];
            updatedCartItems[itemIndex].count += 1;

            // Check if count is 2, then add to cart
            if (updatedCartItems[itemIndex].count === 2) {
                setCartItems(updatedCartItems);
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
            }
        } else {
            // Item does not exist in cart, add with count 1
            const updatedCartItems = [...cartItems, { ...item, count: 1 }];
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
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
                        <input className='searchBar' type='search' placeholder='SEARCH'/>
                        <FontAwesomeIcon icon={faSearch} className="navbar-icon"/>
                    </div>   
                </div>
                <div className="navbar-right">
                    <div className='naviconsBg'>
                        <FontAwesomeIcon icon={faShoppingCart} className="navbar-icon" />
                        <span className="cart-count">{cartItems.reduce((total, item) => total + item.count, 0)}</span>
                    </div>
                    <div className='naviconsBg'>
                        <FontAwesomeIcon icon={faHeart} className="navbar-icon" />
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
                {images && images.map((item1,index)=>{
                    return (
                        <div className='products' key={index}>
                            <div className='PImgc'>
                                <img className='product' src={item1.img} alt={item1.name} />
                                <div className='colum'>
                                    <p className='priceTag'>Name:<span>{item1.name}</span></p>   
                                    <p className='priceTag'>Price:<span>60</span></p>   
                                    <button className='productsBtn' onClick={() => addToCart(item1)}>ADD TO CART</button>
                                    <button className='productsBtn'>WISHLIST</button>
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
                            <h1>
                                Categories
                            </h1>
                            <p>BreakFast E#ssentials</p>
                            <p>Meals in Minutes</p>
                            <p>
                                Bevetages
                            </p>
                        </div>
                        <div>
                            <h1>Ploices</h1>
                            <p>Terms and Conditions</p>
                            <p>Privacy Policy</p>
                            <p>Canccellations and Return</p>
                            <p>Shipping aFeees and Delivery</p>
                        </div>
                        <div>
                            <h1>Help</h1>
                            <p>Payments</p>
                            <p>Shipping Fees and delivery
                            </p>
                            <p>Track Oder</p>
                        </div>
                    
            </footer>
        </div>        
    );
}

export default Header;
