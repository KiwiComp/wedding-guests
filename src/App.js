import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage/StartPage';
import TableOrder from './components/TableOrder/TableOrder';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/table/:tableNumber" element={<TableOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
