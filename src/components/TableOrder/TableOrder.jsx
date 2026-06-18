import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDrinksByCategory } from '../../constants/drinks';
import { submitOrder } from '../../services/firestoreService';
import './TableOrder.css';

const TableOrder = () => {
  const { tableNumber } = useParams();
  const navigate = useNavigate();
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
    const confirmed = window.confirm('Are you sure you want to discard all drinks?');
    if (confirmed) {
      setQuantities({});
    }
  };

  const handleSubmitOrder = async () => {
    const totalItems = getTotalItems();
    if (totalItems === 0) {
      alert('Please select at least one drink');
      return;
    }

    setIsSubmitting(true);
    try {
      const drinksArray = buildDrinksArray();
      await submitOrder(tableNumber, drinksArray);
      navigate('/');
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="table-order">
      <div className="order-container">
        <div className="order-header">
          <button
            className="back-button"
            onClick={() => navigate('/')}
            title="Go back to table selection"
          >
            ← Back
          </button>
          <h1>Table {tableNumber}</h1>
          <div className="cart-info">
            <span className="cart-count">{getTotalItems()}</span>
          </div>
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
          <button
            className="discard-button"
            onClick={handleDiscardOrder}
            disabled={getTotalItems() === 0}
          >
            Discard
          </button>
          <div className="total-info">
            <span className="total-label">Total Items:</span>
            <span className="total-count">{getTotalItems()}</span>
          </div>
          <button
            className="submit-button"
            onClick={handleSubmitOrder}
            disabled={getTotalItems() === 0 || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Send Order to Bar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableOrder;
