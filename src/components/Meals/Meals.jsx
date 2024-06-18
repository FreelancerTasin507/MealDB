import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "../Footer/Footer";
import HeaderImg from "../HeaderImg/HeaderImg";
import Meal from "../Meal/Meal";
import PopularMeal from "../PopularMeal/PopularMeal";
import AboutUs from "../AboutUs/AboutUs";
import LoadingPage from "../LoadingPage/LoadingPage";

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

  // Loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <>
          <HeaderImg></HeaderImg>
          <PopularMeal>z</PopularMeal>
          <div className="mt-28">
            <h1 className="text-4xl font-semibold text-center">
              Your Favourite Food
            </h1>
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
              <div className="mt-10 mb-10 text-center">
                <button
                  onClick={handleSeeMore}
                  className="btn btn-warning rounded-2xl w-28  text-black font-bold"
                >
                  See More
                </button>
              </div>
            )}
          </div>
          <AboutUs></AboutUs>
          <Footer></Footer>
        </>
      )}
    </>
  );
};

export default Meals;
