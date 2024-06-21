import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import { addToDb, getShoppingCart } from "../../Utilities/Utilitis";

const Modal = () => {
  const { id } = useParams();
  const [filteredData, setFilteredData] = useState({});
  const [modalMeal, setModalMeal] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://mealdb-server.onrender.com/singleMeal/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meal details");
        }
        const data = await response.json();
        setFilteredData(data)
      } catch (error) {
        console.error("Error fetching meal details:", error);
      }
    };

    if (id) {
      fetchMealDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchAllMeals = async () => {
      try {
        const response = await fetch(
          "https://mealdb-server.onrender.com/allMeals"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        console.log("Fetched all meals:", data); // Debug log
        setModalMeal(data || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchAllMeals();
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = modalMeal.find((product) => product._id === id);
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
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product._id);
  };

  return (
    <>
      <div className="lg:flex justify-center items-center gap-16 mt-10 mb-10">
        {filteredData.strMealThumb ? (
          <div>
            <img
              className="rounded-2xl"
              src={filteredData.strMealThumb}
              alt={filteredData.strMeal}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="lg:w-4/5">
          {filteredData.strMeal ? (
            <>
              <h1 className="font-bold md:text-5xl">
                Name: {filteredData.strMeal}
              </h1>
              <hr className="border-3 bg-slate-400 w-2/4 mt-3" />
              <h1 className="font-semibold md:text-2xl mt-5 mb-5">
                Category: {filteredData.strCategory}
              </h1>
              <p>
                <span className="font-bold text-xl">Instructions:</span>{" "}
                {filteredData.strInstructions}
              </p>
              <div className="flex items-center gap-5">
                <button
                  onClick={() => handleAddToCart(filteredData)}
                  className="btn btn-warning rounded-3xl font-bold mt-6"
                >
                  Add to Cart
                </button>
                <Link to={"/"} className="btn btn-secondary rounded-full mt-6">
                  Go Back
                </Link>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Modal;
