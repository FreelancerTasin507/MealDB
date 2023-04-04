import React from "react";

const Modal = (props) => {
  console.log(props.meals);
  const {strMeal,strMealThumb,strCategory,strArea,strInstructions} = props.meals;

  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-left text-3xl font-bold mb-5">
              {strMeal}
          </h3>
          <img className="md:w-3/4" src={strMealThumb} alt="" />
          <p className="py-4">
            Area:{strArea}
          </p>
          <p className="py-4">
            Category:{strCategory}
          </p>
          <p className="py-4">
            Instraction:{strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
