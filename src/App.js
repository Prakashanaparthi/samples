import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Header from './Components/Header';

import  CartPage from './Components/CartPage'
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        {/* <Header /> */}
        <Routes>
        <Route path='/' element={<Header />}/>

          <Route path='/cart' element={<CartPage/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
