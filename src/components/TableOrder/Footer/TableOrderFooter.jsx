import { RiDeleteBin5Line } from "react-icons/ri";
import './TableOrderFooter.css';

const TableOrderFooter =({getTotalItems, isSubmitting, handleDiscardOrder, handleSubmitOrder}) => {
    return (
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
    );
};

export default TableOrderFooter;