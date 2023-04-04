import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "../Footer/Footer";
import Meal from "../Meal/Meal";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [numToShow, setNumToShow] = useState(6);
  const itemsPerLoad = 6;
  // console.log(meals);
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=a`)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals));
  }, []);

  const handleSeeMore = () => {
    setNumToShow(numToShow + itemsPerLoad);
  };

  return (
    <div className="mt-28">
      <h1 className="text-4xl font-semibold">Your Favourite Food</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {meals.slice(0, numToShow).map((meal) => (
          <Meal
            key={meal.idMeal}
            handleSeeMore={handleSeeMore}
            meals={meal}
          ></Meal>
        ))}
      </div>
        {meals.length > numToShow && (
            <div className="mt-10 mb-10">
            <button onClick={handleSeeMore} className="btn btn-warning rounded-2xl w-28  text-black font-bold">See More</button>
            </div>
          )}
        
        <Footer></Footer>
    </div>
  );
};

export default Meals;
