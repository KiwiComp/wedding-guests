import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';

const StartPage = () => {
  const navigate = useNavigate();
  const tables = Array.from({ length: 8 }, (_, i) => i + 1);

  const handleTableSelect = (tableNumber) => {
    navigate(`/table/${tableNumber}`);
  };

  return (
    <div className="start-page">
      <div className="start-container">
        <h1>Wedding Drink Order</h1>
        <p>Select your table to order drinks</p>
        <div className="table-grid">
          {tables.map((tableNumber) => (
            <button
              key={tableNumber}
              className="table-button"
              onClick={() => handleTableSelect(tableNumber)}
            >
              Table {tableNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
