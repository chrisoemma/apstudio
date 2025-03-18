"use client"; // Mark this as a Client Component
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF from "../_components/ReceiptPDF";

const BookingSuccessContent = () => {
  const searchParams = useSearchParams();
  const packageName = searchParams.get("package");
  const amount = searchParams.get("amount");
  const customerName = searchParams.get("customerName");
  const customerEmail = searchParams.get("customerEmail");
  const customerPhone = searchParams.get("customerPhone");
  const transactionId = searchParams.get("TransID"); // DPO transaction ID

  // Get the current date for the receipt
  const date = new Date().toLocaleDateString();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-2xl w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg mb-4">
            Thank you for your booking. Your payment has been confirmed.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-gray-600">Package:</p>
              <p className="font-medium">{packageName}</p>
            </div>
            <div>
              <p className="text-gray-600">Amount Paid:</p>
              <p className="font-medium">{amount}</p>
            </div>
            <div>
              <p className="text-gray-600">Transaction ID:</p>
              <p className="font-medium">{transactionId || "Processing..."}</p>
            </div>
            <div>
              <p className="text-gray-600">Date:</p>
              <p className="font-medium">{date}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-2 rounded transition-colors"
            onClick={() => (window.location.href = "/")}
          >
            Return to Homepage
          </button>

          <PDFDownloadLink
            document={
              <ReceiptPDF
                transactionId={transactionId}
                packageName={packageName}
                amount={amount}
                date={date}
                customerName={customerName}
                customerEmail={customerEmail}
                customerPhone={customerPhone}
              />
            }
            fileName="booking_receipt.pdf"
          >
            {({ loading }) =>
              loading ? (
                <button className="bg-blue-500 text-white px-6 py-2 rounded opacity-75 cursor-wait" disabled>
                  Generating Receipt...
                </button>
              ) : (
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors">
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