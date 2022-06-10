import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import HomeScreen from './page/HomeScreen';
import Detail from './page/Detail';
import Register from './page/Register';
import { ToastContainer } from 'react-toastify';
import Login from './page/Login';
import BookingTicket from './page/BookingTicket';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/booking_ticket/:id"
          element={<BookingTicket />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
