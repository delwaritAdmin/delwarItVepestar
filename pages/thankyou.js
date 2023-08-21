import React from "react";
import ShopLayout from "@/components/ShopPage/Layout/Layout";
import Header from "@/components/HomePage/Header";

function thankyou() {
  return (
    <>
      <Header />
      <ShopLayout>
        <div className="min-h-screen flex  items-start  justify-center bg-gray-100">
          <div className="max-w-md mx-auto mt-[10rem] bg-white shadow-lg p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-center">Thank You!</h1>
            <p className="text-lg text-gray-700 mb-6 text-center">
              We appreciate your order. It means a lot to us!
            </p>
            <div className="flex items-center justify-center ">
              <svg
                className="h-16 w-16 text-green-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-10a1 1 0 11-2 0V7a1 1 0 112 0v1zM9 13a1 1 0 012 0v2a1 1 0 11-2 0v-2zm4-4a1 1 0 100-2h-2a1 1 0 100 2h2z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xl text-gray-700 font-semibold">
                Order placed successfully!
              </p>
            </div>
          </div>
        </div>
      </ShopLayout>
    </>
  );
}

export default thankyou;
