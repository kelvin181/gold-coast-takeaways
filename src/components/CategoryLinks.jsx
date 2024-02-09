import React from "react";

const CategoryLinks = (props) => {
  const { categories, currentCategory, handleCategoryChange } = props;

  return (
    <div className="category-links">
      <div className="links">
        {categories
          .filter((category) => category !== "Hidden")
          .map((category) => (
            <a
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={currentCategory === category ? "active" : ""}
            >
              <span className="category-link">{category}</span>
            </a>
          ))}
      </div>
    </div>
  );
};

export default CategoryLinks;
