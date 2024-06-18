import React from "react";

const HeaderImg = () => {
  return (
      <div>
        <img
          className="mt-10 lg:w-4/5 mx-auto relative opacity-60"
          src="Header-img.png"
          alt=""
        />
        <div className="absolute md:top-48 top-40 left-0 right-0 font-bold text-center">
          <h1 className="font-bold md:text-2xl  lg:text-6xl text-white">
            Taste Our Delicious <br className="lg:block md:hidden"/> Best Foods
          </h1>
          <p className="md:mt-6 md:mb-8 hidden md:block  md:w-[90%] m-auto md:text-xl">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have <br className="hidden md:block"/> suffered alteration in some form, by
            injected humou.
          </p>
          <input className="md:px-20 md:py-2 mt-4 bg-white" type="text" />{" "}
          <button className="md:btn md:btn-active md:btn-warning md:rounded-2xl">
            Search
          </button>
        </div>
      </div>
  );
};

export default HeaderImg;
