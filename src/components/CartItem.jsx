import React from "react";

const CartItem = (props) => {
  const { item, onRemoveAll } = props;
  return (
    <div className="cart-item" key={item.id}>
      <div className="item-text">
        <div className="item-name">
          <b>{item.name}</b>
        </div>
        {item.category !== "Specials" && item.type !== "no-desc" && item.type !== "fish" && item.type !== "shakes" && (
          <div className="cart-description">{item.desc}</div>
        )}
        <span className="item-price">
          {item.qty} x ${item.price.toFixed(2)} = ${(item.price * item.qty).toFixed(2)}
        </span>
      </div>
      <button className="cart-remove-all" onClick={() => onRemoveAll(item)}>
        X
      </button>
    </div>
  );
};

export default CartItem;
