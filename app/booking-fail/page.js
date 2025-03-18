"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

const BookingFailContent = () => {
  const searchParams = useSearchParams();
  const [paymentUrl, setPaymentUrl] = useState('');

  useEffect(() => {
    // Try to get payment URL from URL parameters first (from DPO backURL)
    const urlPaymentUrl = searchParams.get('paymentUrl');
    
    // If not in URL, try to get from sessionStorage
    const storedPaymentUrl = sessionStorage.getItem('lastPaymentUrl');
    
    // Use URL parameter if available, otherwise use stored URL
    setPaymentUrl(urlPaymentUrl || storedPaymentUrl);
  }, [searchParams]);

  const handleRetryPayment = () => {
    if (paymentUrl) {
      // If we have a payment URL, redirect to it
      window.location.href = paymentUrl;
    } else {
      // If no payment URL is available, redirect to packages page
      window.location.href = "/packages";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
          <p className="text-lg mb-4">
            We were unable to process your payment. Please try again or contact support.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition-colors"
            onClick={handleRetryPayment}
          >
            {paymentUrl ? 'Retry Payment' : 'Return to Packages'}
          </button>
          
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded transition-colors"
            onClick={() => window.location.href = "/contact"}
          >
            Contact Support
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          If you continue to experience issues, please contact our support team for assistance.
        </p>
      </div>
    </div>
  );
};

const BookingFail = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingFailContent />
    </Suspense>
  );
};

export default BookingFail;