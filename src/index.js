import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CartProvider } from "./context/cart-context";
import { ProductsProvider } from "./context/product-context";
// import mockServer from "./api/mock.server";
import { BrowserRouter as Router } from "react-router-dom";

// mockServer();

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <CartProvider>
          <ProductsProvider>
            <App />
          </ProductsProvider>
        </CartProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
