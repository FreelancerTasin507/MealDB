import React, { useEffect, useState } from "react";
import "./ViewCart.css";
import {  getShoppingCart, removeFromDb } from "../../Utilities/Utilitis";
import { FaRegTrashCan } from "react-icons/fa6";

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

  const handleRemoveFromCart = (id)=>{
    const remaining = cart.filter(reMeal => reMeal.idMeal !== id);
    setCart(remaining)
    removeFromDb(id);
  }

  return (
   <div>
      {cart.map((item) => (
        <div key={item.idMeal} className="cart-item">
          <img src={item.strMealThumb} alt={item.strMeal} />
          <div>
            <h3>{item.strMeal}</h3>
            <p>Price: ${item.price || "N/A"}</p> {/* Assuming there's a price field */}
            <p>Order Quantity: {item.quantity}</p>
          </div>
          <button onClick={()=>handleRemoveFromCart(item.idMeal)}>
            <FaRegTrashCan />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewCart;
