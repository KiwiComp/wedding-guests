import './TableOrderTabs.css';

const TableOrderTabs = ({ categories, activeTab, setActiveTab }) => {
  return (
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
  );
};

export default TableOrderTabs;