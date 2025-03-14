"use client";
import React from "react";

const BookingFail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg mb-4">
          We were unable to process your payment. Please try again or contact support.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-lg"
            onClick={() => (window.location.href = "/packages")}
          >
            Retry Payment
          </button>
          <button
            className="bg-gray-600 text-white px-6 py-2 rounded-lg"
            onClick={() => (window.location.href = "/contact")}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingFail;