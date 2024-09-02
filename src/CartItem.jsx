import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

    const calculateTotalAmount = () => {
    const totalAmount = cart.reduce((total, item) => {
      const itemCost = Number(item.cost) || 0;
      const itemQuantity = Number(item.quantity) || 0;
      console.log(`Item: ${item.name}, Cost: ${itemCost}, Quantity: ${itemQuantity}`); // Debugging line
      return total + itemCost * itemQuantity;
    }, 0);
    console.log(`Total Amount: ${totalAmount}`); // Debugging line
    return totalAmount.toFixed(2);
  };

  // Handle the continue shopping action
  const handleContinueShopping = (e) => {
    if (e) {
      e.preventDefault(); // Only call preventDefault if the event object exists
    }
    setShowCart(false);
  };
  

  // Handle increment of item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrement of item quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      handleRemove(item); // If quantity is 1, remove the item from the cart
    }
  };

  // Handle removal of item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
   const calculateTotalCost = (item) => {
    const itemCost = Number(item.cost) || 0;
    const itemQuantity = Number(item.quantity) || 0;
    return (itemCost * itemQuantity).toFixed(2);
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
        <button className="get-started-button" onClick={(e) => onContinueShopping(e)}>Continue Shopping</button>

        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


