
import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/header';
import { Navbar } from './components/Navbar/navbar';
import { Home } from './pages/home/home';
import { Wishlist } from './pages/wishlist/wishlist';
import { ProductListing } from './pages/products-listing/products-listing';
import { Cart } from './pages/cart/cart';
import { useCart } from './context/cart-context';




function App() {
  const [route, setRoute] = useState("productListing");

  function handleSetRoute(route) {
    setRoute(route)
  }
  const { wishList, cartList } = useCart();

  const wishlistLength = wishList.length;
  const cartlistLength = cartList.length;

  return (
    <div className="App">
      <Header setRoute={handleSetRoute} wishlistLength={wishlistLength} cartlistLength={cartlistLength} />
      <Navbar setRoute={handleSetRoute} />
      {route === "home" && <Home setRoute={handleSetRoute} />}
      {route === "wishlist" && <Wishlist />}
      {route === "productListing" && <ProductListing />}
      {route === "cart" && <Cart />}
    </div>
  );
}

export default App;
