"use client"; // Mark this as a Client Component
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF from "../_components/ReceiptPDF";

const BookingSuccessContent = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const packageName = searchParams.get("package");
  const amount = searchParams.get("amount");

  // Get the current date for the receipt
  const date = new Date().toLocaleDateString();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg mb-4">
          Thank you for your payment. Your booking has been confirmed.
        </p>
        <div className="mb-6">
          <p className="text-gray-700">Booking ID: {bookingId}</p>
          <p className="text-gray-700">Package: {packageName}</p>
          <p className="text-gray-700">Amount: {amount}</p>
        </div>

        {/* Download Receipt Button */}

        <div className="flex gap-4 justify-center">
          <button
            className="bg-gray-100 text-black px-6 py-2"
            onClick={() => (window.location.href = "/")}
          >
            Return to Homepage
          </button>

          <PDFDownloadLink
            document={
              <ReceiptPDF
                bookingId={bookingId}
                packageName={packageName}
                amount={amount}
                date={date}
              />
            }
            fileName="booking_receipt.pdf"
          >
            {({ loading }) =>
              loading ? (
                <button className="bg-blue-500 text-white px-6 py-2" disabled>
                  Generating Receipt...
                </button>
              ) : (
                <button className="bg-blue-600 text-white px-6 py-2 ">
                  Download Receipt
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

const BookingSuccess = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSuccessContent />
    </Suspense>
  );
};

export default BookingSuccess;