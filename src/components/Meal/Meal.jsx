import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

const Meal = (props) => {
  const { strMealThumb, strMeal, strInstructions, strPrice} = props.meals;
  const { handleAddToCart } = props;

  // console.log(_id);

  return (
    <div className="card lg:card-side shadow-2xl bg-neutral-900 rounded-2xl">
      <figure>
        <img className="lg:w-3/4" src={strMealThumb} alt="Movie" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title font-bold md:text-2xl md:text-center">
          {strMeal}
        </h2>
        <h2 className="card-title font-bold md:text-2xl md:text-center">
         Price: ${strPrice}
        </h2>
        <p className="text-left font-bold">Recipee : </p>
        <p className="text-left">
          {strInstructions.length <= 70
            ? strInstructions
            : `${strInstructions.slice(0, 70)} .... `}
        </p>
        <div className="flex md:gap-3">
          <Link
            to={`/modal/${props.meals._id}`}
            className="btn btn-button rounded-3xl"
          >
            Show More
          </Link>
          <button
            onClick={() => handleAddToCart(props.meals)}
            className="btn btn-warning rounded-3xl font-bold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meal;
