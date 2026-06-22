import React, { useState } from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import { getDrinksByCategory } from '../../constants/drinks';
import { submitOrder } from '../../services/firestoreService';
import './TableOrder.css';

const TableOrder = () => {
  const { tableNumber } = useParams();
  const [quantities, setQuantities] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const drinksByCategory = getDrinksByCategory();
  const categories = Object.keys(drinksByCategory);
  const [activeTab, setActiveTab] = useState(categories[0]);

  const getQuantity = (drinkId) => quantities[drinkId] || 0;

  const incrementQuantity = (drinkId) => {
    setQuantities((prev) => ({
      ...prev,
      [drinkId]: (prev[drinkId] || 0) + 1,
    }));
  };

  const decrementQuantity = (drinkId) => {
    setQuantities((prev) => ({
      ...prev,
      [drinkId]: Math.max(0, (prev[drinkId] || 0) - 1),
    }));
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const buildDrinksArray = () => {
    const drinksArray = [];
    Object.entries(quantities).forEach(([drinkId, quantity]) => {
      if (quantity > 0) {
        // Find the drink object from all categories
        let drink = null;
        Object.values(drinksByCategory).forEach((category) => {
          const found = category.find((d) => d.id === drinkId);
          if (found) drink = found;
        });
        if (drink) {
          drinksArray.push({
            id: drink.id,
            name: drink.name,
            category: drink.category,
            quantity: quantity,
          });
        }
      }
    });
    return drinksArray;
  };

  const handleDiscardOrder = () => {
    if (getTotalItems() === 0) {
      return;
    }
    const confirmed = window.confirm('Är du säker på att du vill ta bort alla tillagda drinkar?');
    if (confirmed) {
      setQuantities({});
    }
  };

  const handleSubmitOrder = async () => {
    const totalItems = getTotalItems();
    if (totalItems === 0) {
      alert('Var vänlig välj minst en drink');
      return;
    }

    setIsSubmitting(true);
    try {
      const drinksArray = buildDrinksArray();
      await submitOrder(tableNumber, drinksArray);
      setQuantities({});
      setActiveTab(categories[0]);
      alert('Order skickad. Skål för kärleken!');
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('Misslyckades med att skicka order. Försök igen.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="table-order">
      <div className="order-container">
        <div className="order-header">
          <h1>Wingrens Bar</h1>
          <h2>Bord nummer {tableNumber}</h2>
        </div>

        <div className="tabs-section">
          <div className="tabs-header">
            {categories.map((category) => (
              <button
                key={category}
                className={`tab-button ${activeTab === category ? 'active' : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="drinks-container">
            <div className="drinks-list">
              {drinksByCategory[activeTab].map((drink) => (
                <div key={drink.id} className="drink-item">
                  <div className="drink-info">
                    <h3 className="drink-name">{drink.name}</h3>
                    {drink.ingredients && (
                      <p className="drink-ingredients">
                        {drink.ingredients.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="qty-btn minus"
                      onClick={() => decrementQuantity(drink.id)}
                      disabled={getQuantity(drink.id) === 0}
                    >
                      −
                    </button>
                    <span className="quantity-display">
                      {getQuantity(drink.id)}
                    </span>
                    <button
                      className="qty-btn plus"
                      onClick={() => incrementQuantity(drink.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-footer">

          <div className="total-info">
            <span className="total-label">Totalt antal:</span>
            <span className="total-count">{getTotalItems()}</span>
          </div>
          <div className='action-buttons'>
            <button
              className="discard-button"
              onClick={handleDiscardOrder}
              disabled={getTotalItems() === 0}
              title="Delete all drinks"
            >
              {/* 🗑️ */}
              <RiDeleteBin5Line size={25}/>
            </button>
            <button
              className="submit-button"
              onClick={handleSubmitOrder}
              disabled={getTotalItems() === 0 || isSubmitting}
            >
              {isSubmitting ? 'Skickar...' : 'Skicka order till baren'}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TableOrder;
