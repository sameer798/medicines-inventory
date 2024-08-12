import classes from "./CartItem.module.css";


const CartItem = (props) => {
  
  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${props.price}</span>
          <span className={classes.amount}>x{props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove.bind(null, props.id)}>−</button>
        <button onClick={props.onAdd.bind(null, props.id)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
