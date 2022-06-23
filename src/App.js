import logo from './logo.svg';
import $ from 'jquery';
import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import HomeScreen from './page/HomeScreen';
import Detail from './page/Detail';
import Register from './page/Register';
import { ToastContainer } from 'react-toastify';
import Login from './page/Login';
import BookingTicket from './page/BookingTicket';
import Loading from './page/Loading';
import Admin from './page/Admin';
import MovieManagement from './component/_MovieManagement';
import UserManagement from './component/_UserManagement';
import AddMovie from './component/_AddMovie';
import AddUser from './component/_AddUser';
import EditInformation from './page/EditInfomation';

function App() {
  return (
    <div className="app">
      <Loading />
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
        <Route
          exact
          path="/edit_information"
          element={<EditInformation />}
        />
        {/* ADMIN */}
        <Route path="/admin" element={<Admin />}>
          <Route
            exact
            path={'/admin/movie_management'}
            element={<MovieManagement />}
          ></Route>
          <Route
            exact
            path={'/admin/user_management'}
            element={<UserManagement />}
          />
          <Route
            exact
            path={'/admin/add_user'}
            element={<AddUser />}
          />
          <Route
            exact
            path={'/admin/add_movie'}
            element={<AddMovie />}
          />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
