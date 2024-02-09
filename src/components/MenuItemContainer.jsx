import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MenuItemContainer = (props) => {
  const { onAdd, onRemove, item, existingItem, menuItems, cartItems } = props;
  const [selectedSize, setSelectedSize] = useState(null);
  const [secondary, setSecondary] = useState(null);
  const [sizeError, setSizeError] = useState(false);

  const largePorkId = 93;
  const mediumPorkId = 94;
  const activePorkId =
    selectedSize === "medium"
      ? mediumPorkId
      : selectedSize === "large"
      ? largePorkId
      : null;
  const activePorkItem =
    cartItems !== undefined
      ? cartItems.find((x) => x.id === activePorkId)
      : null;

  useEffect(() => {
    if (selectedSize === "medium") {
      setSecondary(94);
    } else if (selectedSize === "large") {
      setSecondary(93);
    }
  }, [selectedSize]);

  const getCrumbedItem = (item, items) => {
    if (items && items.length > 0) {
      const crumbedItem = items.find(
        (crumbed) =>
          crumbed.type === "crumb" &&
          crumbed.name.toLowerCase().includes(item.name.toLowerCase())
      );

      return crumbedItem;
    }
  };

  const handleAddCrumb = (item, menuItems) => {
    const crumbedItem = getCrumbedItem(item, menuItems);

    crumbedItem &&
      (item.qty === 0
        ? onAdd(crumbedItem)
        : (onAdd(crumbedItem, null, true), onRemove(item, true)));

    toast.success("Crumb added");
  };

  const handleRemoveCrumb = (item) => {
    const crumbedItem =
      item.type !== "crumb" ? getCrumbedItem(item, cartItems) : item;
    if (crumbedItem.qty > 0) {
      onRemove(crumbedItem, true), onAdd(item, null, true);
    }
    toast.error("Crumb removed");
  };

  const hasCrumbedFishInCart = (item, cartItems) => {
    if (item.type !== "fish" || !cartItems) {
      return false;
    }
    return cartItems.some(
      (cartItem) =>
        cartItem.type === "crumb" &&
        cartItem.name.toLowerCase().includes(item.name.toLowerCase())
    );
  };

  const handleSizeButtonClick = (size) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleAddToCart = () => {
    if (!activePorkId && item.id === 92) {
      setSizeError(true);
    } else {
      onAdd(item, secondary);
    }
  };

  return (
    <div className="menu-item">
      <div className="item-header">
        <span className="item-title">{item.name}</span>
        <span className="item-price">
          ${item.id === 92 ? item.price : item.price.toFixed(2)}
        </span>
      </div>
      <div className="item-description">{item.desc && <p>{item.desc}</p>}</div>
      {item.name === "Sweet & Sour Pork" && (
        <div className="pork-size-buttons">
          <button
            onClick={() => handleSizeButtonClick("medium")}
            className={selectedSize === "medium" ? "medium selected" : "medium"}
          >
            Medium
          </button>
          <button
            onClick={() => handleSizeButtonClick("large")}
            className={selectedSize === "large" ? "large selected" : "large"}
          >
            Large
          </button>
        </div>
      )}

      <div className="item-bottom">
        {existingItem || activePorkItem ? (
          <>
            <div className="quantity">
              <span className="current-quantity">
                {existingItem
                  ? existingItem.qty
                  : activePorkItem
                  ? activePorkItem.qty
                  : null}
              </span>
              <button
                className="decrease-quantity"
                onClick={() => onRemove(existingItem || activePorkItem)}
              >
                -
              </button>
              <button
                className="increase-quantity"
                onClick={() => onAdd(existingItem || activePorkItem)}
              >
                +
              </button>
            </div>
            {existingItem &&
              existingItem.qty > 0 &&
              existingItem.type === "fish" &&
              !hasCrumbedFishInCart(item, cartItems) && (
                <span className="crumb-option">
                  <button
                    className="add-crumb"
                    onClick={() => handleAddCrumb(existingItem, menuItems)}
                  >
                    Add
                    <br />
                    Crumb
                  </button>
                </span>
              )}
            {existingItem &&
              existingItem.qty > 0 &&
              existingItem.type === "fish" &&
              hasCrumbedFishInCart(item, cartItems) && (
                <span className="crumb-option">
                  <button
                    className="add-crumb"
                    onClick={() => handleAddCrumb(existingItem, menuItems)}
                  >
                    Add
                    <br />
                    Crumb
                  </button>
                  <button
                    className="remove-crumb"
                    onClick={() => handleRemoveCrumb(existingItem)}
                  >
                    Minus
                    <br />
                    Crumb
                  </button>
                </span>
              )}
          </>
        ) : (
          <>
            <motion.button
              className="add-to-cart"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.1 }}
            >
              Add to Cart
            </motion.button>
            {hasCrumbedFishInCart(item, cartItems) && (
              <span className="crumb-option">
                <button
                  className="remove-crumb-only"
                  onClick={() => handleRemoveCrumb(item)}
                >
                  Minus
                  <br />
                  Crumb
                </button>
              </span>
            )}
            {sizeError && (
              <span className="error-message">Please select a size.</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuItemContainer;
