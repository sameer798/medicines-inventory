import React, { useReducer } from "react";
import CartContext from "./cart-context";

const medicineReduce = (state, action) => {
  switch (action.type) {
    case "ADD":
      const existMedIndex = state.items.findIndex(
        (med) => med.id === action.item.id
      );
      const existingMedicine = state.items[existMedIndex];
      let updatedMedicines;
      if (existingMedicine) {
        const updateMedicine = {
          ...existingMedicine,
          quantity: existingMedicine.quantity + action.item.quantity,
        };
        updatedMedicines = [...state.items];
        updatedMedicines[existMedIndex] = updateMedicine;
      } else {
        updatedMedicines = state.items.concat(action.item);
      }

      return {
        ...state,
        items: updatedMedicines,
      };

    case "ADD_TO_CART":
      const existingCartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.id
      );
      const existingMedicineIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      if (existingMedicineIndex !== -1) {
        const existingMedicine = state.items[existingMedicineIndex];
        let updatedCartItems = [...state.cartItems];
        let updatedTotalAmount = parseFloat(state.totalAmount) || 0; // Ensure it's a number

        if (existingCartItemIndex !== -1) {
          // Increase quantity in cartItems
          const updatedCartItem = {
            ...updatedCartItems[existingCartItemIndex],
            quantity: updatedCartItems[existingCartItemIndex].quantity + 1,
          };
          updatedCartItems[existingCartItemIndex] = updatedCartItem;

          // Decrease quantity in items
          const updatedMedicine = {
            ...existingMedicine,
            quantity: existingMedicine.quantity - 1,
          };
          const updatedItems = [...state.items];
          updatedItems[existingMedicineIndex] = updatedMedicine;

          updatedTotalAmount += parseFloat(existingMedicine.price); // Ensure price is a number

          return {
            ...state,
            items: updatedItems,
            cartItems: updatedCartItems,
            totalAmount: updatedTotalAmount,
          };
        } else {
          // Add new item to cartItems
          const updatedMedicineItem = {
            ...existingMedicine,
            quantity: existingMedicine.quantity - 1,
          };
          const newCartItem = {
            ...existingMedicine,
            quantity: 1,
          };

          const updatedItems = [...state.items];
          updatedItems[existingMedicineIndex] = updatedMedicineItem;

          updatedTotalAmount += parseFloat(existingMedicine.price); // Ensure price is a number

          return {
            ...state,
            items: updatedItems,
            cartItems: updatedCartItems.concat(newCartItem),
            totalAmount: updatedTotalAmount,
          };
        }
      }
      break;

    case "INCREASE_ITEM":
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.id
      );
      const itemIndex = state.items.findIndex((item) => item.id === action.id);

      if (cartItemIndex !== -1 && itemIndex !== -1) {
        const cartItem = state.cartItems[cartItemIndex];
        const item = state.items[itemIndex];

        // Increase quantity in cartItems
        const updatedCartItem = {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[cartItemIndex] = updatedCartItem;

        // Decrease quantity in items
        const updatedItem = {
          ...item,
          quantity: item.quantity - 1,
        };
        const updatedItems = [...state.items];
        updatedItems[itemIndex] = updatedItem;

        // Update totalAmount
        const updatedTotalAmount =
          parseFloat(state.totalAmount) + parseFloat(item.price); // Ensure price is a number

        return {
          ...state,
          items: updatedItems,
          cartItems: updatedCartItems,
          totalAmount: updatedTotalAmount,
        };
      }
      break;

    case "DECREASE_ITEM":
      const cartItemIndexToDecrease = state.cartItems.findIndex(
        (item) => item.id === action.id
      );
      const itemIndexToIncrease = state.items.findIndex(
        (item) => item.id === action.id
      );

      if (cartItemIndexToDecrease !== -1 && itemIndexToIncrease !== -1) {
        const cartItemToDecrease = state.cartItems[cartItemIndexToDecrease];
        const itemToIncrease = state.items[itemIndexToIncrease];

        if (cartItemToDecrease.quantity > 1) {
          // Decrease quantity in cartItems
          const updatedCartItem = {
            ...cartItemToDecrease,
            quantity: cartItemToDecrease.quantity - 1,
          };
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[cartItemIndexToDecrease] = updatedCartItem;

          // Increase quantity in items
          const updatedItem = {
            ...itemToIncrease,
            quantity: itemToIncrease.quantity + 1,
          };
          const updatedItems = [...state.items];
          updatedItems[itemIndexToIncrease] = updatedItem;

          // Update totalAmount
          const updatedTotalAmount =
            parseFloat(state.totalAmount) - parseFloat(itemToIncrease.price); // Ensure price is a number

          return {
            ...state,
            items: updatedItems,
            cartItems: updatedCartItems,
            totalAmount: updatedTotalAmount,
          };
        } else {
          // Remove item from cartItems
          const updatedCartItems = state.cartItems.filter(
            (item) => item.id !== action.id
          );

          // Increase quantity in items
          const updatedItem = {
            ...itemToIncrease,
            quantity: itemToIncrease.quantity + 1,
          };
          const updatedItems = [...state.items];
          updatedItems[itemIndexToIncrease] = updatedItem;

          // Update totalAmount
          const updatedTotalAmount =
            parseFloat(state.totalAmount) - parseFloat(itemToIncrease.price); // Ensure price is a number

          return {
            ...state,
            items: updatedItems,
            cartItems: updatedCartItems,
            totalAmount: updatedTotalAmount,
          };
        }
      }
      break;

    default:
      return state;
  }
};

const CartProvider = (props) => {
  const [medState, setMedStateDispatch] = useReducer(medicineReduce, {
    items: [],
    cartItems: [],
    totalAmount: 0,
  });

  const addItemTHandler = (item) => {
    setMedStateDispatch({ type: "ADD", item: item });
  };
  const addToCartHandler = (id) => {
    setMedStateDispatch({ type: "ADD_TO_CART", id: id });
  };

  const increaseItemHandler = (id) => {
    setMedStateDispatch({ type: "INCREASE_ITEM", id: id });
  };

  const decreaseItemCartHandler = (id) => {
    setMedStateDispatch({ type: "DECREASE_ITEM", id: id });
  };

  const cartContext = {
    items: medState.items,
    cartItems: medState.cartItems,
    totalAmount: medState.totalAmount,
    addItem: addItemTHandler,
    addToCart: addToCartHandler,
    increaseItem: increaseItemHandler,
    decreaseItem: decreaseItemCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
