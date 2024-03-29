// import { useState } from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/header";
// import { Navbar } from './components/Navbar/navbar';
import { Home } from "./pages/home/home";
import { Wishlist } from "./pages/wishlist/wishlist";
import { ProductListing } from "./pages/products-listing/products-listing";
import { Cart } from "./pages/cart/cart";
import { Login } from "./pages/login/login";
import Signup from "./pages/signup/signup";
// import { useCart } from './context/cart-context';
import { PrivateRoute } from "./private/PrivateRoute";
import { RequireAuth } from "./private/RequireAuth";
import { useAuth } from "./context/auth-context";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/products"
          element={
            <RequireAuth>
              <ProductListing />
            </RequireAuth>
          }
        />
        <Route
          path="/cart"
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequireAuth>
              <Wishlist />
            </RequireAuth>
          }
        />

        {/* <PrivateRoute path="/products" element={<ProductListing />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} /> */}
      </Routes>
    </div>
  );
}

export default App;
