import React from "react";

const PaymentPage = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center ">
        <div className=" p-8 rounded-lg w-full max-w-md shadow-2xl lg:glass">
          <h1 className="text-2xl font-bold mb-4">Payment Proceed</h1>
          <form>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="cardNumber"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="expiryDate"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                placeholder="MM/YY"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="cvv"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                placeholder="123"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
