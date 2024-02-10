import React, { useEffect, useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../styles.css";
import Cart from "./Cart";
import CategoryLinks from "./CategoryLinks";
import MenuItemContainer from "./MenuItemContainer";
import SpecialsContainer from "./SpecialsContainer";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [categoryLinksClicked, setCategoryLinksClicked] = useState(false);
  const [burgerSubcategories, setBurgerSubcategories] = useState([]);
  let addItem;

  useEffect(() => {
    fetch("https://goldcoasttakeaways.pythonanywhere.com/api/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data);
        const uniqueCategories = Array.from(
          new Set(data.map((item) => item.category))
        );
        setCategories(uniqueCategories);
        setCurrentCategory(uniqueCategories[0]);
      });
  }, []);

  useLayoutEffect(() => {
    if (categoryLinksClicked) {
      window.scrollTo(0, 0);
      setCategoryLinksClicked(false);
    }
  }, [categoryLinksClicked]);

  const handleCategoryChange = (category) => {
    if (currentCategory === category) {
      window.scrollTo(0, 0);
    } else {
      setCurrentCategory(category);
      setCategoryLinksClicked(true);
    }
  };

  const groupByCategory = () => {
    const groupedItems = {};
    menuItems.forEach((item) => {
      if (!groupedItems[item.category]) {
        groupedItems[item.category] = [];
      }
      groupedItems[item.category].push(item);
    });
    return groupedItems;
  };

  useEffect(() => {
    const burgerSubcategories = menuItems
      .filter((item) => item.category === "Burgers")
      .map((item) => item.subcategory);
    setBurgerSubcategories([...new Set(burgerSubcategories)]);
  }, [menuItems]);

  const onAdd = (item, secondary, crumb) => {
    if (item.id === 92) {
      if (secondary) {
        addItem = menuItems.find((x) => x.id == secondary);
      } else {
        return;
      }
    } else {
      addItem = item;
    }

    setCartItems((cartItems) => {
      const exist = cartItems.find((x) => x.id === addItem.id);
      const updatedCartItems = exist
        ? cartItems.map((x) =>
            x.id === addItem.id ? { ...exist, qty: exist.qty + 1 } : x
          )
        : [...cartItems, { ...addItem, qty: 1 }];

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });

    if (!crumb) {
      toast.success("Added to Cart");
    }
  };

  const onRemove = (item, crumb) => {
    setCartItems((cartItems) => {
      const exist = cartItems.find((x) => x.id === item.id);
      const updatedCartItems =
        exist && exist.qty === 1
          ? cartItems.filter((x) => x.id !== item.id)
          : exist
          ? cartItems.map((x) =>
              x.id === item.id ? { ...exist, qty: exist.qty - 1 } : x
            )
          : cartItems;

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return updatedCartItems;
    });

    if (!crumb) {
      toast.error("Removed from Cart");
    }
  };

  const onRemoveAll = (item) => {
    const newCartItems = cartItems.filter((x) => x.id !== item.id);
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    toast.error("Removed from Cart");
  };

  useEffect(() => {
    setCartItems(
      localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    );
  }, []);

  return (
    <>
      <div className="menu-title" id="menu">
        <div className="menu-title-content">
          <h1>Menu</h1>
        </div>
      </div>

      <CategoryLinks
        categories={categories}
        currentCategory={currentCategory}
        handleCategoryChange={handleCategoryChange}
      />

      <div className="menu-section">
        <div className="section-title">
          <h2>{currentCategory}</h2>
        </div>
        <div className="menu-content">
          <div className="invisible-box">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis
            reprehenderit, vel harum minima totam quasi velit, hic consequuntur
            nostrum deserunt laborum unde maiores voluptates dolore, amet rem
            aspernatur cupiditate aut.
          </div>

          {currentCategory === "Burgers" ? (
            <div className="burger-subcategories">
              {burgerSubcategories.map((subcategory, index) => (
                <div key={subcategory} className="burger-subcategory">
                  <h2
                    className={`burger-subcategory-header${
                      index === 0 ? " first-subcategory" : ""
                    }`}
                  >
                    {subcategory} Burgers
                  </h2>
                  <div className="menu-items">
                    {menuItems
                      .filter(
                        (item) =>
                          item.category === "Burgers" &&
                          item.subcategory === subcategory
                      )
                      .map((item) => (
                        <MenuItemContainer
                          key={item.id}
                          item={item}
                          existingItem={cartItems.find((x) => x.id === item.id)}
                          onAdd={onAdd}
                          onRemove={onRemove}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : currentCategory === "Specials" ? (
            <div className="specials-container">
              {groupByCategory()[currentCategory]?.map((item) => (
                <SpecialsContainer
                  key={item.id}
                  item={item}
                  existingItem={cartItems.find((x) => x.id === item.id)}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ) : currentCategory !== "Hidden" ? (
            <div className="menu-items">
              {groupByCategory()[currentCategory]?.map((item) => (
                <MenuItemContainer
                  key={item.id}
                  item={item}
                  existingItem={cartItems.find((x) => x.id === item.id)}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  menuItems={menuItems}
                  cartItems={cartItems}
                />
              ))}
            </div>
          ) : null}

          <div className="cart-container">
            <Cart
              countCartItems={cartItems.length}
              cartItems={cartItems}
              onRemoveAll={onRemoveAll}
            />
          </div>
        </div>
        <div id="shopping-cart">
          <Cart
            countCartItems={cartItems.length}
            cartItems={cartItems}
            onRemoveAll={onRemoveAll}
          />
        </div>
        <Link to="/menu#shopping-cart" className="scroll-to-cart">
          Cart
        </Link>
      </div>
    </>
  );
};

export default Menu;
