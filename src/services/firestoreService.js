import { db } from './firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { ORDER_STATUS } from '../constants/orderStatus';

const ORDERS_COLLECTION = 'orders';

export const submitOrder = async (tableNumber, drinks) => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const tableSubcollectionRef = collection(ordersRef, `table-${tableNumber}`, 'items');

    const orderData = {
      drinks,
      timestamp: Timestamp.now(),
      status: ORDER_STATUS.NEW,
    };

    const docRef = await addDoc(tableSubcollectionRef, orderData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

export const getOrders = async (tableNumber) => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const tableSubcollectionRef = collection(ordersRef, `table-${tableNumber}`, 'items');

    const q = query(tableSubcollectionRef, orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
