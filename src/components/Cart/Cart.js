import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../store/cart-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const onAddCartHandler = (id)=>{
    cartCtx.increaseItem(id)
  }

  const onRemoveCartHandler = id =>{
    cartCtx.decreaseItem(id)
  }

  const cartitems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.cartItems.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onAdd={onAddCartHandler}
          onRemove={onRemoveCartHandler}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClick={props.onCartClose}>
      {cartitems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCartClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
