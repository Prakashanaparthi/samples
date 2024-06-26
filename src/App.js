import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import WishlistPage from './Components/wishlistPage';
import CartPage from './Components/CartPage';


import './App.css';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import CheckoutForm from './Components/CheckoutForm'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Header/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='signup' element={<SignupForm/>}></Route>
          <Route path='/checkout' element={<CheckoutForm/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
