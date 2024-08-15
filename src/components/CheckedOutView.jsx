import React from 'react';
import '../css/CheckedOutView.css';

function CheckedOutView({ orders }) {
  return (
    <div className="checked-out-view">
      <h2>Checked-Out Orders</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <div>Table {order.id}</div>
            <div>Items: {order.items.join(', ')}</div>
            <div>Checked Out At: {new Date(order.checkedOutAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckedOutView;
