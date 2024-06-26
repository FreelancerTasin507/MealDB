import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getShoppingCart } from "../../Utilities/Utilitis";
import HeaderImg from "../HeaderImg/HeaderImg"; // Ensure you import HeaderImg if it's used elsewhere

const Header = () => {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);

  // console.log(meals);

  useEffect(() => {
    fetch(`https://mealdb-server.onrender.com/allMeals`)
      .then((res) => res.json())
      .then((data) => setMeals(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = meals.find((product) => product._id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [meals]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="navbar sticky top-0 z-10 bg-neutral-900 rounded-2xl">
      <div className="flex-1">
        <Link className="font-bold text-3xl ml-3" to="/">
          MealDB
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {totalItems}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{totalItems} Items</span>
              <span className="text-info">
                Subtotal:{" "}
                {cart.reduce(
                  (total, item) => total + item.quantity * item.strPrice,
                  0
                )}
              </span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">
                  <Link to="/viewcart">View cart</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="images.jpg"
                alt="User Avatar"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
