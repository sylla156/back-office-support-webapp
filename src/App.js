import React from 'react';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

import "./App.css";

export default function App() {
  const toastOptions = {
    style: {
      background: '#262B40',
      borderRadius: '10px',
      color: '#eaedf2'
    }
  };

  return (
    <>
      <ScrollToTop />
      <HomePage />
      <Toaster toastOptions={toastOptions} />
    </>
  );
}
