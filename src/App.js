import Header from './components/Layout/Header'
import AvailableMedicines from './components/Medicines/AvailableMedicines';
import MedicinesInputForm from './components/Medicines/MedicinesInputForm';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import CartProvider from './components/store/CartProvider';
function App() {
 const [showCart, setShowCart] = useState(true);

 const cartShowHandler = ()=>{
    setShowCart(false);
 }
 const cartHideHandler = () =>{
  setShowCart(true)
 }
  return (
    <CartProvider>
      <Header onCartShow={cartShowHandler}/>
      <main>
      {!showCart && <Cart onCartClose={cartHideHandler}/>}
      <MedicinesInputForm/>
      <AvailableMedicines/>
      </main>
    </CartProvider>
  );
}

export default App;
