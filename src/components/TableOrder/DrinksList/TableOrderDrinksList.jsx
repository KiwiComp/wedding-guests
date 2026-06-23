import './TableOrderDrinksList.css';

const TableOrderDrinksList = ({
    drinksByCategory, 
    activeTab, 
    decrementQuantity, 
    getQuantity, 
    incrementQuantity}) => 
{
    return (
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
    );
};

export default TableOrderDrinksList;