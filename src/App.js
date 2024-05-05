import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Body from './components/MainBody/MainBody';
// import Login from './components/Login/Login';
import React, { lazy, Suspense, useState } from 'react';
// import Registration from './components/Registration/Registration';
// import FoodCard from './components/FoodCard/FoodCard'
// import FoodCart from './components/FoodCart/FoodCart'
import Loader from 'components/Loader/Loader';
import { ToastList } from "components/Toast/Toast";
import ToastProvider from 'components/Toast/ToastProvider';

const Login = lazy(() => import('./components/Login/Login.jsx'));
const Registration = lazy(() => import('./components/Registration/Registration.jsx'));
const FoodCart = lazy(() => import('./components/FoodCart/FoodCart.jsx'));
const FoodCard = lazy(() => import('./components/FoodCard/FoodCard.jsx'));
const FoodList = lazy(() => import('./components/FoodList/FoodList.jsx'));


function App() {
  const [toasts, setToasts] = useState([]);
  const autoClose = true;
  const autoCloseDuration = 5;
  const position = "top-right";

  const showToast = (message, type) => {
    const toast = {
      id: Date.now(),
      message,
      type,
    };

    setToasts((prevToasts) => [...prevToasts, toast]);

    if (autoClose) {
      setTimeout(() => {
        removeToast(toast.id);
      }, autoCloseDuration * 1000);
    }
  }

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" Component={Body}>
            <Route exact path="/" Component={FoodList} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/register" Component={Registration} />
            <Route exact path="/foodlist/:id" Component={FoodCard} />
            <Route exact path="/cart" Component={FoodCart} />
          </Route>
          <Route path="*" element={<Navigate from="*" to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
