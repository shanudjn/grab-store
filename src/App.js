
import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { Navbar } from './components/Navbar/navbar';
import { Home } from './pages/home/home';
import { Wishlist } from './pages/wishlist/wishlist';
import { ProductListing } from './pages/products-listing/products-listing';
import { Cart } from './pages/cart/cart';




function App() {
  const [route, setRoute] = useState("productListing");

  function handleSetRoute(route) {
    setRoute(route)
  }

  return (
    <div className="App">
      <Header setRoute={handleSetRoute} />
      <Navbar setRoute={handleSetRoute} />
      {route === "home" && <Home />}
      {route === "wishlist" && <Wishlist />}
      {route === "productListing" && <ProductListing />}
      {route === "cart" && <Cart />}
    </div>
  );
}

export default App;
