
import { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header/header';
import { Navbar } from './components/Navbar/navbar';
import { Home } from './pages/home/home';
import { Wishlist } from './pages/wishlist/wishlist';
import { ProductListing } from './pages/products-listing/products-listing';
import { Cart } from './pages/cart/cart';
import { useCart } from './context/cart-context';




function App() {


  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
