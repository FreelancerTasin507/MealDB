import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import ViewCart from "./components/ViewCart/ViewCart";
import Profile from "./components/Profile/Profile";
import Modal from "./components/Modal/Modal";
import PaymentPage from "./components/PaymentPage/PaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Meals></Meals>,
      },
      {
        path: "viewcart",
        element: <ViewCart></ViewCart>,
      },
      {
        path: "Payment",
        element: <PaymentPage></PaymentPage>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "modal/:id",
        element: <Modal></Modal>,
        loader: ({ params }) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
          ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
