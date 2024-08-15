import React, { useState } from 'react';
import '../css/CategorySelector.css';

function CategorySelector({ categories, onSelectCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(categories)[0]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="category-selector">
      <h2>Select a Category</h2>
      <div className="category-buttons">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`category-button ${category === selectedCategory ? 'selected' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategorySelector;
