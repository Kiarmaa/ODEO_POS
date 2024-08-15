import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategorySelector from './CategorySelector';
import '../css/Menu.css';

const categories = {
  Pizzas: ['Margherita', 'Pepperoni', 'BBQ Chicken', 'Vegetarian', 'Hawaiian', 'Seafood', 'Four Cheese', 'Buffalo Chicken'],
  Burgers: ['Cheeseburger', 'Bacon Burger', 'Veggie Burger', 'BBQ Burger', 'Mushroom Swiss', 'Spicy Chicken Burger', 'Classic Burger'],
  Drinks: ['Coke', 'Pepsi', 'Sprite', 'Water', 'Lemonade', 'Iced Tea', 'Orange Juice'],
  Sides: ['Fries', 'Onion Rings', 'Garlic Bread', 'Mozzarella Sticks', 'Salad', 'Nachos', 'Chicken Wings'],
  Desserts: ['Chocolate Cake', 'Cheesecake', 'Apple Pie', 'Brownie', 'Ice Cream', 'Tiramisu', 'Panna Cotta'],
  Appetizers: ['Spring Rolls', 'Bruschetta', 'Stuffed Mushrooms', 'Chicken Skewers', 'Quesadillas', 'Garlic Shrimp'],
  Pastas: ['Spaghetti Bolognese', 'Fettuccine Alfredo', 'Penne Arrabbiata', 'Lasagna', 'Mac and Cheese', 'Carbonara'],
  Soups: ['Tomato Soup', 'Chicken Noodle Soup', 'Minestrone', 'Clam Chowder', 'Beef Barley Soup', 'French Onion Soup'],
};

function Menu({ tables, addItemToTable, checkoutTable }) {
  const { tableId } = useParams();
  const table = tables.find(t => t.id === parseInt(tableId));
  const [selectedItems, setSelectedItems] = useState({});
  const [currentCategory, setCurrentCategory] = useState(Object.keys(categories)[0]); // Default category
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItems(prevItems => ({
      ...prevItems,
      [item]: (prevItems[item] || 0) + 1,
    }));
  };

  const handleSubtract = (item) => {
    setSelectedItems(prevItems => {
      const updatedItems = { ...prevItems };
      if (updatedItems[item] > 1) {
        updatedItems[item] -= 1;
      } else {
        delete updatedItems[item];
      }
      return updatedItems;
    });
  };

  const handleDone = () => {
    if (Object.keys(selectedItems).length > 0) {
      addItemToTable(parseInt(tableId), Object.entries(selectedItems).flatMap(([item, quantity]) => Array(quantity).fill(item)));
      setSelectedItems({}); // Clear selected items after adding to the order
      navigate('/tables');
    } else {
      alert('Please add items to the order before sending to the kitchen.');
    }
  };

  const handleCheckout = () => {
    if (table.items.length > 0 || Object.keys(selectedItems).length > 0) {
      checkoutTable(parseInt(tableId));
      navigate('/tables');
    } else {
      alert('No items to checkout.');
    }
  };

  return (
    <div className="menu-container">
      <div className="table-info">
        <h2>Table {tableId}</h2>
      </div>
      <CategorySelector categories={categories} onSelectCategory={setCurrentCategory} />

      <div className="menu">
        <h2>{currentCategory}</h2>
        <div className="items">
          {categories[currentCategory].map((item) => (
            <button
              key={item}
              className="menu-item"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="current-order">
        <h3>Current Order</h3>
        <ul>
          {table.items.map((item, i) => (
            <li key={i}>{item} (Already Sent)</li>
          ))}
          {Object.entries(selectedItems).map(([item, quantity]) => (
            <li key={item}>
              {item} (New) - Quantity: {quantity}
              <button className="subtract-button" onClick={() => handleSubtract(item)}>
                Subtract
              </button>
            </li>
          ))}
        </ul>
        <button className="done-button" onClick={handleDone}>
          {table.items.length > 0 ? "Add to Order" : "Send to Kitchen"}
        </button>
        <button className="checkout-button" onClick={handleCheckout} disabled={!(table.items.length > 0 || Object.keys(selectedItems).length > 0)}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Menu;
