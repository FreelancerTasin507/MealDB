import React from "react";
import Modal from "../Modal/Modal";

const Meal = (props) => {
  // console.log(props.meals);
  const { strMealThumb, strMeal, strInstructions } = props.meals;
  return (
      <div className="card md:card-side shadow-2xl bg-neutral-900 rounded-2xl">
        <figure>
          <img
          className="md:w-3/4"
            src={strMealThumb}
            alt="Movie"
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title font-bold md:text-2xl md:text-center">{strMeal}</h2>
          <p className="text-left font-bold">Recipee : </p>
          <p className="text-left">
          {strInstructions.length <= 70 ? strInstructions : `${strInstructions.slice(0, 70)}... `}
        </p>
          <div className="flex gap-3">
          <label htmlFor="my-modal-3" className="btn btn-button rounded-3xl">Show More</label >
            <button className="btn btn-warning rounded-3xl font-bold">Add to Cart</button>
          </div>
        </div>
        <Modal meals={props.meals}></Modal>
      </div>
  );
};

export default Meal;
