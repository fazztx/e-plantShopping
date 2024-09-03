import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import ProductList from './ProductList';

const CartItem = ({ addedToCart, onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      //console.log(parseInt(item.cost.substring(1)) * item.quantity);
      //Cost "$x" is converted into integer x
      total += parseInt(item.cost.substring(1)) * item.quantity;
    });
    return total;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
    
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    //console.log(item.quantity);
    //Here I am passing the necessary updated key: value parameters to the reducer so that it can update the value
    let x = item.quantity +1;
    dispatch(updateQuantity({name:item.name, quantity: x})); 

  };

  const handleDecrement = (item) => {
    let x = item.quantity-1;
    if (item.quantity > 1) {
      dispatch(updateQuantity({name:item.name, quantity: x})); //Only decrements when >1
    } else{
      dispatch(removeItem(item));
      addedToCart[item.name] = false;
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    addedToCart[item.name] = false;
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseInt(item.cost.substring(1)) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


