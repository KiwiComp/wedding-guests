import {ALERT_TYPE} from '../../../constants/alerts';
import './TableOrderAlert.css'

const AlertLayout = ({
    setAlertType, 
    title, message, 
    alertType, 
    cancelDiscardOrder, 
    confirmDiscardOrder}) => 
{
    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                <p>{message}</p>
                {(alertType === ALERT_TYPE.ORDER_SUCCESS || alertType === ALERT_TYPE.ERROR) && (
                    <button className='alertButton alertConfirmButton' onClick={() => setAlertType(ALERT_TYPE.NULL)}>
                        OK
                    </button>
                )}
                {alertType === ALERT_TYPE.DISCARD && (
                    <div className='alertActionButtons'>
                        <button 
                            className='alertButton alertNoButton' 
                            onClick={() => cancelDiscardOrder()}>
                            Nej
                        </button>
                        <button 
                            className='alertButton alertConfirmButton' 
                            onClick={() => confirmDiscardOrder()}>
                            Ja
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertLayout;