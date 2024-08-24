import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './pages/Home'; 
import DocumentList from './components/Documents/DocumentList'; 
import DocumentUpload from './components/DocumentUpload'; 
import DocumentMenu from './components/Documents/DocumentMenu';
import TransactionList from './components/Transactions/TransactionList';
import TransactionForm from './components/Transactions/TransactionForm';
import TransactionMenu from './components/Transactions/TransactionMenu';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/documents" element={<DocumentMenu />} />
      <Route path="/documents/upload" element={<DocumentUpload />} />
      <Route path="/documents/list" element={<DocumentList />} />
      <Route path="/transactions" element={<TransactionMenu />} />
      <Route path="/transactions/create" element={<TransactionForm />} />
      <Route path="/transactions/list" element={<TransactionList />} />
    </Routes>
  );
}

export default App;
