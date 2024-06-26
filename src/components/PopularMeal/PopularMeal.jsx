import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "./PopularMeal.css";
import { Link } from "react-router-dom";
import { addToDb, getShoppingCart } from "../../Utilities/Utilitis";

const PopularMeal = () => {
  const [popularMeals, setPopularMeals] = useState([]);
  const [numToShow, setNumToShow] = useState(6);

  useEffect(() => {
    fetch(`https://mealdb-server.onrender.com/allMeals`)
      .then((res) => res.json())
      .then((data) => setPopularMeals(data));
  }, []);

  // localStorage
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = popularMeals.find(
        (product) => product._id === id
      );
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [popularMeals]);

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
    <div>
      <h1 className="text-4xl font-semibold text-center mt-16">
        Popular Foods
      </h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {popularMeals.slice(0, numToShow).map((meal) => (
          <SwiperSlide key={meal._id}>
            <div className="card glass">
              <figure>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{meal.strMeal}</h2>
                <h2 className="card-title">Price: ${meal.strPrice}</h2>
                <p className="hidden md:block">
                  {meal.strInstructions.slice(0, 50)}...
                </p>
                <div className="md:flex gap-3 items-center">
                  <Link
                    to={`/modal/${meal._id}`}
                    className="btn btn-button rounded-3xl"
                  >
                    Show More
                  </Link>
                  <button
                    onClick={() => handleAddToCart(meal)}
                    className="btn btn-warning rounded-3xl font-bold mt-4"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularMeal;
