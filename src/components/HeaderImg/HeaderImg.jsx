import React from "react";

const HeaderImg = () => {
  return (
      <div>
        <img
          className="mt-10 md:w-4/5 mx-auto relative opacity-60"
          src="Header-img.png"
          alt=""
        />
        <div className="absolute md:top-56 top-40 left-0 right-0 font-bold">
          <h1 className="font-bold md:text-6xl text-xl text-white">
            Taste Our Delicious <br /> Best Foods
          </h1>
          <p className="mt-6 mb-8 md:block hidden">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have <br /> suffered alteration in some form, by
            injected humou.
          </p>
          <input className="md:px-20 py-2 mt-4 bg-white" type="text" />{" "}
          <button className="btn btn-active btn-warning rounded-2xl">
            Button
          </button>
        </div>
      </div>
  );
};

export default HeaderImg;
