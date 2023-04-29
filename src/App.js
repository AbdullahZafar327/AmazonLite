import "./App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./components/NavBar/Navbar";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import { commerce } from "./lib/Commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order,setOrder] = useState({})
  const [errorMessage,setErrorMessage] = useState('')
  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const handleAddToCart = async (productId, quantity) => {
    const cart = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };
  const handleUpdateQty = async (productId, quantity) => {
    const cart = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };
  const handleRemove = async (productId) => {
    const cart = await commerce.cart.remove(productId);
    setCart(cart);
  };
  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();
    setCart(cart);
  };

const refreshCart = async()=>{
   const newCart = await commerce.cart.refresh();
   setCart(newCart)
  }

const handleCaptureCheckout =async (checkoutTokenId,newOrder)=>{
  try {
     const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder);
    setOrder(incomingOrder)
    refreshCart();
  } catch (error) {
    setErrorMessage(error.data.error.message)
    
  }
}
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <>
      <Router>
        <Navbar totalItem={cart.total_items} />
        <Routes>
          <Route
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/Cart"
            element={
              <Cart
                cart={cart}
                handleUpdateQty={handleUpdateQty}
                handleRemove={handleRemove}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route path="/Checkout" element={<Checkout 
          cart={cart}
          order={order}
          onCaptureCheckout={handleCaptureCheckout}
          error={errorMessage}
          
          
          />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;