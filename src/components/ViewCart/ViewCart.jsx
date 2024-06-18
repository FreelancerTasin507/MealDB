import React, { useEffect, useState } from "react";
import "./ViewCart.css";
import { getShoppingCart, removeFromDb } from "../../Utilities/Utilitis";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ViewCart = () => {
  const [meal, setMeals] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];

    meal.forEach((meal) => {
      if (storedCart[meal.idMeal]) {
        const mealWithQuantity = { ...meal, quantity: storedCart[meal.idMeal] };
        savedCart.push(mealWithQuantity);
      }
    });

    setCart(savedCart);
  }, [meal]);

  const handleRemoveFromCart = (id) => {
    const remaining = cart.filter((reMeal) => reMeal.idMeal !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;

  for (const product of cart) {
    product.quantity = product.quantity || 1;
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    quantity = quantity + product.quantity;
  }

  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + totalShipping + tax;

  return (
    <div className="md:flex gap-5 mt-16">
      <div className="lg:w-[50%]">
        {cart.map((item) => (
          <div
            key={item.idMeal}
            className="cart-item flex items-center justify-between md:gap-10 md:m-7 mb-3 glass p-3 rounded-3xl "
          >
            <img
              className="w-[100px] rounded"
              src={item.strMealThumb}
              alt={item.strMeal}
            />
            <div>
              <h3>Name: {item.strMeal}</h3>
              <p>Price: ${item.price || "N/A"}</p>{" "}
              {/* Assuming there's a price field */}
              <p>Order Quantity: {item.quantity}</p>
            </div>
            <button
              className="text-2xl bg-black p-2 rounded-full"
              onClick={() => handleRemoveFromCart(item.idMeal)}
            >
              <FaRegTrashCan />
            </button>
          </div>
        ))}
      </div>
      <div className="lg:w-[30%] mx-auto">
        <h1 className="text-4xl font-bold text-center mt-10">Total Order</h1>
        <p className="mt-10"><span className="font-bold mr-2">Selected Items:</span> {quantity}</p>
        <p><span className="font-bold mr-2">Total Price:</span> ${totalPrice}</p>
        <p><span className="font-bold mr-2">Total Shipping:</span> ${totalShipping}</p>
        <p><span className="font-bold mr-2">Tax: </span>${tax.toFixed(2)}</p>
        <h4><span className="font-bold mr-2">Grand Total:</span> ${grandTotal.toFixed(2)}</h4>
        <Link to={`/Payment`} className="btn text-lg w-full mt-5 text-white rounded-full bg">Place Order</Link>
      </div>
    </div>
  );
};

export default ViewCart;
