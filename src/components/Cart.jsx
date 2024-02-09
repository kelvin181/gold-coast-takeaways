import React from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const { cartItems, onRemoveAll } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <>
      <h2>Cart</h2>
      <div className="cart">
        {cartItems.length > 0 ? (
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} onRemoveAll={onRemoveAll} />
            ))}
          </div>
        ) : (
          <div className="empty-cart-text">Your cart is empty.</div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-total">
          <span>Total</span>
          <span className="total-align-right">${itemsPrice.toFixed(2)}</span>
        </div>
      )}
      <div className="complete-order-message">
        To complete your order, please phone: <span className="no-wrap">+64 09 267 3366</span>
      </div>
    </>
  );
};

export default Cart;
