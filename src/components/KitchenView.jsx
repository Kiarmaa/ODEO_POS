import React from 'react';
import '../css/KitchenView.css'; // Ensure this path matches your folder structure

function KitchenView({ orders }) {
  return (
    <div className="kitchen-view">
      {orders.length === 0 ? (
        <p>No Kitchen Tickets</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="ticket">
            <h3>Table {order.tableId}</h3>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default KitchenView;
