import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './components/Dashboard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
    </React.StrictMode>,
  document.getElementById('root')
);
