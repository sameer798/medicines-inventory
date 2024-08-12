import React, { useContext, useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./MedicinesInputForm.module.css";
import Card from "../Card/Card";
import CartContext from "../store/cart-context";

// generate uniqueId -- 

function generateUniqueId(name,  price) {
  const normalizedString = `${name}-${price}`.toLowerCase().replace(/\s+/g, '-');
  const hash = normalizedString.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
  }, 0);
  return hash;
}


const MedicinesInputForm = (props) => {
 const medCtx = useContext(CartContext)
  const  medNameRef =  useRef();
  const medPriceRef = useRef();
  const medQuantityRef = useRef();
  const medDescRef = useRef();

  const [error, setError] = useState(null);

  const formSubmitHandler = event =>{
    event.preventDefault();

  const medName = medNameRef.current.value;
  const medPrice = medPriceRef.current.value;
  const medQuantity = medQuantityRef.current.value;
  const medDesc = medDescRef.current.value;

  if (
    medName.trim() === "" ||
    medPrice.trim() === "" ||
    medQuantity.trim() === "" ||
    medDesc.trim() === ""
  ) {
    setError("Please fill out all fields.");
    return;
  }

  // Clear any previous error message if the validation passes
  setError(null)

  const uniqueId = generateUniqueId(medName, medPrice)
  
   
    const item = {
      id : uniqueId,
      name: medName,
      description : medDesc,
      price : medPrice,
      quantity :  parseInt(medQuantity, 10) 

    }
    medCtx.addItem(item)
    medNameRef.current.value = '';
    medDescRef.current.value = '';
    medPriceRef.current.value = '';
    medQuantityRef.current.value = '';
  }
  return (
    <Card>
        <form onSubmit={formSubmitHandler}>
      <Input
        label="medicine Name"
        ref = {medNameRef}
        input={{
          id: "mName",
          type: "text",
        }}
      />
      <Input
        ref={medDescRef}
        label="description"
        input={{
          id: "desc",
          type: "text",
        }}
      />
      <Input
        label="price"
        ref={medPriceRef}
        input={{
          id: "price",
          type: "number",
        }}
      />
       <Input
        label="quantity"
        ref={medQuantityRef}
        input={{
          id: "quant",
          type: "number",
        }}
      />
      <div className={classes.button}>
        <button>Add Medicine</button>
      </div>
      {error && <p className={classes.error}>{error}</p>}
    </form>
    </Card>
  );
};

export default MedicinesInputForm;
