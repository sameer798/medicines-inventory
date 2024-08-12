import React, { useContext } from "react";
import Card from "../Card/Card";
import classes from './AvailableMedicines.module.css';
import CartContext from "../store/cart-context";



const AvailableMedicines = (props) => {
  const medCtx = useContext(CartContext)
  const addToCartHandler = (id) =>{
    medCtx.addToCart(id)
  }

  
  return (
    <section className={classes.medicines}>
      <Card className={classes.card}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {medCtx.items.map((med) => (
              <tr key={med.id}>
                <td className={classes.name}>{med.name}</td>
                <td className={classes.desc}>{med.description}</td>
                <td className={classes.price}>${med.price}</td>
                
                  <td>{med.quantity}</td>
              
                <td>
                  <button className={classes.addButton} onClick={addToCartHandler.bind(null, med.id)}>Add to Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
};

export default AvailableMedicines;
