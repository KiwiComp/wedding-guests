import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage/StartPage';
import TableOrderPage from './components/TableOrder/TableOrderPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/table/:tableNumber" element={<TableOrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
