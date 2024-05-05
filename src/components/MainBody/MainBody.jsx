import React, { useState } from "react";
import FoodList from "components/FoodList/FoodList";
import { useGetFoodList } from "hooks/api_hooks"
import Loader from "components/Loader/Loader";
import { ToastList } from "components/Toast/Toast";
import Header from "components/Header/Header";
import { Outlet } from "react-router-dom";
import ToastProvider from "components/Toast/ToastProvider";

const Body = () => {

    return (<>
        <ToastProvider>
            <Header />
            <Outlet />
        </ToastProvider>
    </>
    );
};

export default Body;