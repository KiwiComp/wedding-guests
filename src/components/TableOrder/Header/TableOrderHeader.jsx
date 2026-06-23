import './TableOrderHeader.css';

const TableOrderHeader = ({tableNumber}) => {
    return (
        <div className="order-header">
          <h1>Wingrens Bar</h1>
          <h2>Bord nummer {tableNumber}</h2>
        </div>
    );
};

export default TableOrderHeader;