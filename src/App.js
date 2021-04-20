
// import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/header';
// import { Navbar } from './components/Navbar/navbar';
import { Home } from './pages/home/home';
import { Wishlist } from './pages/wishlist/wishlist';
import { ProductListing } from './pages/products-listing/products-listing';
import { Cart } from './pages/cart/cart';
import { Login } from './pages/login/login';
// import { useCart } from './context/cart-context';
import { PrivateRoute } from './private/PrivateRoute';



function App() {


  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/login" element={<Login />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
