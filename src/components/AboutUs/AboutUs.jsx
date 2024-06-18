import React from "react";

const AboutUs = () => {
  return (
    <div className="mb-9">
      <h1 className="text-4xl font-semibold text-center  mt-16 md:mb-20">
        About Us
      </h1>
      <div className="lg:flex md:mx-14 justify-center items-center gap-4 ">
        <div className=" lg:w-1/2 rounded-2xl shadow-2xl px-14 py-32">
          <div className="text-center">
            <h1 className="md:text-5xl font-semibold mb-8">
              About Our <br />{" "}
              <span className="md:text-7xl text-2xl">Resturant</span>
            </h1>
            <p className="text-slate-500 mb-6">
              We specialize in authentic Italian cuisine made with the freshest
              ingredients and prepared with passion and expertise. From classic
              pasta dishes to wood-fired pizzas, our menu offers a wide variety
              of traditional Italian flavors that will transport your taste buds
              straight to Italy.
            </p>
            <button className="btn btn-primary" to="/about">
              About Us
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 ">
          <div className="grid grid-cols-3 gap-4">
            <img
              className="rounded-2xl transition duration-500 transform hover:scale-110"
              src="https://i.ibb.co/yq9W185/about-Image-1.jpg"
              alt=""
            />
            <img
              className="rounded-2xl transition duration-500 transform hover:scale-110"
              src="https://i.ibb.co/znTHs4x/about-Image-2.jpg"
              alt=""
            />
            <img
              className="rounded-2xl transition duration-500 transform hover:scale-110"
              src="https://i.ibb.co/Sc2nQR0/about-Image-3.jpg"
              alt=""
            />
            <img
              className="rounded-2xl transition duration-500 transform hover:scale-110"
              src="https://i.ibb.co/zSj0Fqr/about-Image-7.jpg"
              alt=""
            />
            <div className="flex flex-col justify-between">
              <img
                className="rounded-2xl transition duration-500 transform hover:scale-110"
                src="https://i.ibb.co/cwPfwhg/about-Image-4.jpg"
                alt=""
              />
              <img
                className="rounded-2xl transition duration-500 transform hover:scale-110"
                src="https://i.ibb.co/1T5MsDN/about-Image-6.jpg"
                alt=""
              />
            </div>
            <img
              className="rounded-2xl transition duration-500 transform hover:scale-110"
              src="https://i.ibb.co/mFY6zPb/about-Image-5.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
