"use client";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600">
            At Awesome Photo Studio, we strive to provide top-quality photography services and ensure
            our clients are happy with their experience.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="space-y-8">
              {/* Section 1: Cancellations and Refunds */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-700 mr-3">
                    1
                  </span>
                  Cancellations and Refunds
                </h2>
                <ul className="ml-11 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Cancellations made at least 48 hours before the scheduled session are eligible for a full refund.
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Cancellations made within 24-48 hours of the session qualify for a 50% refund.
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Cancellations within 24 hours of the session are non-refundable.
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    No-shows will not receive a refund.
                  </li>
                </ul>
              </div>

              {/* Section 2: Photo Satisfaction Guarantee */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-700 mr-3">
                    2
                  </span>
                  Photo Satisfaction Guarantee
                </h2>
                <ul className="ml-11 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    If you are not satisfied with your photos, we offer one free re-editing session.
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    If you are still not satisfied, we may provide a complimentary reshoot at our discretion.
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Refunds will not be issued for dissatisfaction with personal appearance, clothing, or expressions.
                  </li>
                </ul>
              </div>

              {/* Section 3: Technical Issues */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-700 mr-3">
                    3
                  </span>
                  Technical Issues and Studio Errors
                </h2>
                <ul className="ml-11 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    If your photos are compromised due to technical malfunctions or studio errors, we will offer a free reshoot.
                  </li>
                </ul>
              </div>

              {/* Section 4: Product Purchases */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-700 mr-3">
                    4
                  </span>
                  Product Purchases (Prints, Albums, Digital Files)
                </h2>
                <ul className="ml-11 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    All digital file sales are final and non-refundable.
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Printed products (e.g., albums, canvases, framed prints) will be replaced if they arrive damaged or defective. Please report any issues within 7 days of receipt.
                  </li>
                </ul>
              </div>

              {/* Section 5: Special Promotions */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-700 mr-3">
                    5
                  </span>
                  Special Promotions & Gift Cards
                </h2>
                <ul className="ml-11 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Refunds are not available for discounted services, promotional packages, or gift card purchases.
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Gift cards are transferable but non-refundable.
                  </li>
                </ul>
              </div>

              {/* Section 6: Processing Time */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-700 mr-3">
                    6
                  </span>
                  Refund Processing Time
                </h2>
                <ul className="ml-11 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Approved refunds will be processed within 5-10 business days.
                  </li>
                </ul>
              </div>

              {/* Contact Information */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  For any concerns, please contact us at{" "}
                  <a href="mailto:contact@apstudio.com" className="text-green-700 hover:text-green-800">
                    contact@apstudio.com
                  </a>
                  . Your satisfaction is our priority, and we are committed to resolving any issues!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;