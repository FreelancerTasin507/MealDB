import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import { addToDb, getShoppingCart } from "../../Utilities/Utilitis";

const Modal = () => {
  const { id } = useParams();

  const [filtereddata, setFilteredData] = useState({});
  const [modalMeal, setModalMeal] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meal details");
        }
        const data = await response.json();
        const mealDetails = data.meals ? data.meals[0] : null;
        if (mealDetails) {
          setFilteredData(mealDetails);
        } else {
          setFilteredData({});
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
        // Handle error as needed (e.g., show error message)
      }
    };

    fetchMealDetails();
  }, [id]);

  useEffect(() => {
    const fetchAllMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=a"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        setModalMeal(data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
        // Handle error as needed (e.g., show error message)
      }
    };

    fetchAllMeals();
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = modalMeal.find((product) => product.idMeal === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [modalMeal]);

  const handleAddToCart = (product) => {
    let newCart = [];
    const exists = cart.find((pd) => pd.idMeal === product.idMeal);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.idMeal !== product.idMeal);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product.idMeal);
  };

  return (
    <>
      <div className="lg:flex justify-center items-center gap-16 mt-10 mb-10">
        <div>
          <img
            className="rounded-2xl"
            src={filtereddata.strMealThumb}
            alt={filtereddata.strMeal}
          />
        </div>
        <div className="lg:w-4/5">
          <h1 className="font-bold md:text-5xl">
            Name: {filtereddata.strMeal}
          </h1>
          <hr className="border-3 bg-slate-400 w-2/4 mt-3" />
          <h1 className="font-semibold md:text-2xl mt-5 mb-5">
            Category: {filtereddata.strCategory}
          </h1>
          <p>
            <span className="font-bold text-xl">Instructions:</span>{" "}
            {filtereddata.strInstructions}
          </p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => handleAddToCart(filtereddata)}
              className="btn btn-warning rounded-3xl font-bold mt-6"
            >
              Add to Cart
            </button>
            <Link to={"/"} className="btn btn-secondary rounded-full mt-6">
              Go Back
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Modal;
