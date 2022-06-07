import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import HomeScreen from './page/HomeScreen';
import Detail from './page/Detail';
import Register from './page/Register';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
