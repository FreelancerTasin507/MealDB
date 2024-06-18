import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Footer from "../Footer/Footer";
import HeaderImg from "../HeaderImg/HeaderImg";
import Meal from "../Meal/Meal";
import PopularMeal from "../PopularMeal/PopularMeal";
import AboutUs from "../AboutUs/AboutUs";
import LoadingPage from "../LoadingPage/LoadingPage";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../Utilities/Utilitis";

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

  // localStorage

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1: get id of the addedProduct
    for (const id in storedCart) {
      // step 2: get product from products state by using id
      const addedProduct = meals.find((product) => product.id === id);
      if (addedProduct) {
        // step 3: add quantity
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step 4: add the added product to the saved cart
        savedCart.push(addedProduct);
      }
      // console.log('added Product', addedProduct)
    }
    // step 5: set the cart
    setCart(savedCart);
  }, [meals]);

  const handleAddToCart = (product) => {
    console.log(product);
    // cart.push(product); '
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1
    const exists = cart.find((pd) => pd.id === product.idMeal);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.idMeal);
      newCart = [...remaining, exists];
    }
    setCart(newCart);
    addToDb(product.idMeal);
  };

 
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
                  handleAddToCart={handleAddToCart}
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
