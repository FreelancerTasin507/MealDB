import React from "react";
import { BallTriangle } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <div>
      <div className="ml-[30%] mt-[40%] md:ml-[45%] md:mt-[20%]">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    </div>
  );
};

export default LoadingPage;
