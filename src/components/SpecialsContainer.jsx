import React from "react";

const SpecialsContainer = (props) => {
  const { onAdd, onRemove, item, existingItem } = props;

  return (
    <>
      <div className="specials-item">
        <h2>{item.name}</h2>

        {item.desc.map((line, index) => (
          <p key={index}>{line}</p>
        ))}

        <h3>${item.price.toFixed(2)}</h3>
        <div className="item-bottom">
          {existingItem ? (
            <div className="quantity">
              <span className="current-quantity">{existingItem.qty}</span>
              <button
                className="decrease-quantity"
                onClick={() => onRemove(existingItem)}
              >
                -
              </button>
              <button
                className="increase-quantity"
                onClick={() => onAdd(existingItem)}
              >
                +
              </button>
            </div>
          ) : (
            <button className="add-to-cart" onClick={() => onAdd(item)}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SpecialsContainer;
