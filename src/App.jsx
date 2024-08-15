import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TablesView from './components/TablesView';
import Menu from './components/Menu';
import KitchenView from './components/KitchenView';
import CheckoutView from './components/CheckedOutView'; // If using

function App() {
  const [tables, setTables] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      status: 'empty',
      items: [],
    }))
  );

  const [kitchenOrders, setKitchenOrders] = useState([]);

  const addItemToTable = (tableId, newItems) => {
    setTables(tables.map(table =>
      table.id === tableId
        ? { ...table, status: 'occupied', items: [...table.items, ...newItems] }
        : table
    ));
    setKitchenOrders([...kitchenOrders, { tableId, items: newItems }]);
  };

  const checkoutTable = (tableId) => {
    setTables(tables.map(table =>
      table.id === tableId
        ? { ...table, status: 'empty', items: [] }
        : table
    ));
    setKitchenOrders(kitchenOrders.filter(order => order.tableId !== tableId));
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/tables" element={<TablesView tables={tables} />} />
            <Route
              path="/menu/:tableId"
              element={<Menu tables={tables} addItemToTable={addItemToTable} checkoutTable={checkoutTable} />}
            />
            <Route path="/kitchen" element={<KitchenView orders={kitchenOrders} />} />
            <Route path="/checkout" element={<CheckoutView />} /> {/* If using */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
