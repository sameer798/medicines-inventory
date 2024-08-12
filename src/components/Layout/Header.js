import React from "react";
import classes from "./Header.module.css";
import CartIcon from "../Cart/CartIcon";


function Header(props) {

  return (
    <header className={classes.header}>
      <div>
        <h1>Medicines Inventory</h1>
      </div>

      <button onClick={props.onCartShow}>
        <span>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span>{3}</span>
      </button>
    </header>
  );
}

export default Header;
