import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import BoxShadow from './Customs/BoxShadow/BoxShadow';

const Route = () => {

    const route = createBrowserRouter([
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/box-shadow',
            element: <BoxShadow></BoxShadow>
        }
    ]);

    return (
        <>
            <RouterProvider router={route} />
        </>
    );
};

export default Route;