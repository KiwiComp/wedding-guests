import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDrinksByCategory } from '../../constants/drinks';
import { submitOrder } from '../../services/firestoreService';
import './TableOrderPage.css';
import TableOrderHeader from './Header/TableOrderHeader';
import TableOrderTabs from './Tabs/TableOrderTabs';
import TableOrderDrinksList from './DrinksList/TableOrderDrinksList';
import TableOrderFooter from './Footer/TableOrderFooter';
import { ALERT_TYPE, alertConfig } from '../../constants/alerts';
import AlertLayout from './Alerts/TableOrderAlert';

const TableOrderPage = () => {
  const { tableNumber } = useParams();
  const [quantities, setQuantities] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const drinksByCategory = getDrinksByCategory();
  const categories = Object.keys(drinksByCategory);
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [alertType, setAlertType] = useState(null);

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
    setAlertType(ALERT_TYPE.DISCARD);
  };

  const confirmDiscardOrder = () => {
    setQuantities({});
    setAlertType(ALERT_TYPE.NULL);
  }

  const cancelDiscardOrder = () => {
    setAlertType(ALERT_TYPE.NULL);
  }

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
      setAlertType(ALERT_TYPE.ORDER_SUCCESS);
    } catch (error) {
      console.error('Failed to submit order:', error);
      setAlertType(ALERT_TYPE.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="table-order">
      <div className="order-container">
        <TableOrderHeader tableNumber={tableNumber} />
        <div className="tabs-section">
          <TableOrderTabs 
            categories={categories} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
          <div className="drinks-container">
            <TableOrderDrinksList 
              drinksByCategory={drinksByCategory} 
              activeTab={activeTab} 
              decrementQuantity={decrementQuantity} 
              getQuantity={getQuantity} 
              incrementQuantity={incrementQuantity}
            />
          </div>
        </div>
        <TableOrderFooter 
          getTotalItems={getTotalItems} 
          isSubmitting={isSubmitting} 
          handleDiscardOrder={handleDiscardOrder} 
          handleSubmitOrder={handleSubmitOrder}
        />
      </div>
      
      {alertType && (
        <AlertLayout
          setAlertType={setAlertType}
          alertType={alertType}
          title={alertConfig[alertType].title}
          message={alertConfig[alertType].message}
          cancelDiscardOrder={cancelDiscardOrder}
          confirmDiscardOrder={confirmDiscardOrder}
        />
      )}
    </div>
  );
};

export default TableOrderPage;
