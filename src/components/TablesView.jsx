import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/TablesView.css'; // Adjust the path if necessary

function TablesView({ tables }) {
  const navigate = useNavigate();

  const handleTableClick = (tableId, status) => {
    navigate(`/menu/${tableId}`);
  };

  return (
    <div className="tables-view">
      {tables.map((table) => (
        <div
          key={table.id}
          className={`table ${table.status}`}
          onClick={() => handleTableClick(table.id, table.status)}
        >
          Table {table.id}
        </div>
      ))}
    </div>
  );
}

export default TablesView;
