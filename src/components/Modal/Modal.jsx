import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";

const Modal = () => {
  const { id } = useParams();
  // console.log(singleMeal);

  const [filtereddata, setFilteredData] = useState([]);

  console.log(filtereddata);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=a")
      .then((res) => res.json())
      .then((data) => {
        const matchedData = data.meals.find(
          (mealDetails) => mealDetails.idMeal == id
        );
        // console.log(mealdata);
        if (matchedData) {
          setFilteredData(matchedData);
        }
      });
  }, [id]);

  return (
    <>
      <div className="flex justify-center items-center gap-16 mt-10 mb-10">
        <div>
          <img className="rounded-2xl" src={filtereddata.strMealThumb} alt="" />
        </div>
        <div className="w-4/5">
          <h1 className="font-bold md:text-5xl">Name: {filtereddata.strMeal}</h1>
          <hr className="boder-3 bg-slate-400 w-2/4 mt-3" />
          <h1 className="font-semibold md:text-2xl mt-5 mb-5">Category: {filtereddata.strCategory}</h1>
          <p><span className="font-bold text-xl">Instructions:</span> {filtereddata.strInstructions}</p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Modal;
