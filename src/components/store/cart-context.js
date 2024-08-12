import React from "react";

const CartContext = React.createContext({
  totalAmount: 0,
  items: [],
  cartItems: [],
  addToCart : ()=>{},
  addItem: (item) => {},
  increaseItem: (id) => {},
  decreaseItem: (id) => {},
});

export default CartContext;
