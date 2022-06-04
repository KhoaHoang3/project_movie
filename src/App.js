import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import HomeScreen from './page/HomeScreen';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
