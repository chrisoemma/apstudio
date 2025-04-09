"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const packages = [
  {
    id: "1",
    title: "Essence Package",
    description: [
      "1-hour photo shoot at a location of your choice",
      "30-40 professionally edited pictures",
      "1-minute highlight video",
    ],
    price: "$300",
    images: ["/package1.JPG", "/package2.JPG", "/package3.JPG"],
  },
  {
    id: "2",
    title: "Eterno Package",
    description: [
      "2 to 3-hour family photo shoot",
      "Unlimited professionally edited pictures",
      "Sunset pictures & video",
      "Drone shots & photo book",
      "Full documentary-style video",
    ],
    price: "$500",
    images: ["/package1.JPG", "/package2.JPG", "/package3.JPG"],
  },
  {
    id: "3",
    title: "Island romance wedding Package",
    description: [
      "Full-day wedding photography",
      "Unlimited edited pictures",
      "Sunset photos & video",
      "Jet ski & horse riding photo session",
      "Drone shots & cinematic documentary",
      "Photo book & elegant wooden frame",
    ],
    price: "$1000",
    images: ["/package1.JPG", "/package2.JPG", "/package3.JPG"],
  },
  {
    id: "4",
    title: "Island elegance package",
    description: [
      "Full-Day Photo Shoot: Capture every moment from start to finish, with unlimited photos",
      "DJ Services: Professional DJ to keep the celebration lively throughout the event",
      "Decorations: Elegant décor for the beach ceremony and dinner setting",
      "Makeup Services: Professional makeup artist to ensure everyone looks their best",
      "Pre-Wedding Photoshoot: A special session before the big day to capture intimate moments",
      "Documentary-Style Video: A full-length video documenting the event, capturing candid moments and highlights",
      "Customizable Add-Ons: Options for personalized touches like special lighting, additional décor elements",
    ],
    price: "$5800",
    images: ["/package1.JPG", "/package2.JPG", "/package3.JPG"],
  },
];

const BookingContent = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");
  const [packageData, setPackageData] = useState(null);
  const [activeTab, setActiveTab] = useState("debit");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    confirmEmail: "",
    phone: "",
    specialRequests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Show a toast message if there are validation errors
      toast.error("Please check the form for errors.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    return true;
  };

  const initiatePayment = async (orderId, amount) => {
    if (!validateForm()) return; // Stop if validation fails

    setLoading(true);
    try {
      const numericAmount = parseFloat(amount.toString().replace(/[^0-9.]/g, ""));
      
      // Create success URL with package information
      const successUrl = new URL(process.env.NEXT_PUBLIC_REDIRECT_URL);
      successUrl.searchParams.append('package', packageData.title);
      successUrl.searchParams.append('amount', amount);
      successUrl.searchParams.append('customerName', `${formData.firstName} ${formData.surname}`);
      successUrl.searchParams.append('customerEmail', formData.email);
      successUrl.searchParams.append('customerPhone', formData.phone);

      const payload = {
        amount: numericAmount,
        currency: "USD",
        companyRef: "5700",
        redirectURL: successUrl.toString(),
        backURL: `${process.env.NEXT_PUBLIC_BACK_URL}?paymentUrl=PAYMENT_URL`,  // DPO will replace PAYMENT_URL with actual URL
        serviceType:"99302",
        ...formData,
      };

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to initiate payment");
      }

      const data = await res.json();

      if (data.paymentUrl) {
        // Store payment URL in sessionStorage before redirecting
        sessionStorage.setItem('lastPaymentUrl', data.paymentUrl);
        window.location.href = data.paymentUrl;
      } else {
        toast.error("Payment initialization failed. Please try again.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (packageId) {
      const selectedPackage = packages.find((pkg) => pkg.id === packageId);
      if (selectedPackage) {
        setPackageData(selectedPackage);
      } else {
        console.error("Package not found");
      }
    }
  }, [packageId]);

  if (!packageData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Package not found. Please go back and select a package. {packageId}
      </div>
    );
  }


  const { title, description, price, images } = packageData;

  return (
    <div className="flex min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 flex-col">
      {/* Top Row: Two Cards Side by Side */}
      <ToastContainer />
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
        {/* Left Card: Person Check-in Information */}
        <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Book Your Package</h1>
          <p className="text-base sm:text-lg mb-4">
            You're about to book the <strong>{title}</strong> package. Secure your spot now!
            {packageData.id === "4" && (
              <span className="ml-2 inline-block bg-gradient-to-r from-amber-500 to-yellow-300 text-white text-xs font-bold px-3 py-1 rounded-full">
                PREMIUM
              </span>
            )}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-green-500 mr-2">✔</span>
            <span>This package includes:</span>
          </div>
          <ul className="list-disc pl-5 text-base sm:text-lg text-gray-700 space-y-1 sm:space-y-2 mb-4">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="text-lg sm:text-xl font-bold text-green-700 mb-6">Price: {price}</div>

          <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Details</h2>
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">First name *</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g. John"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Surname *</label>
                <input
                  type="text"
                  name="surname"
                  className="w-full p-2 border rounded-lg"
                  placeholder="e.g. Smith"
                  value={formData.surname}
                  onChange={handleChange}
                />
                {errors.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email address *</label>
              <input
                type="email"
                name="email"
                className="w-full p-2 border rounded-lg"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email for confirmation</label>
              <input
                type="email"
                name="confirmEmail"
                className="w-full p-2 border rounded-lg"
                value={formData.confirmEmail}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm">
                  Please uncheck this box if you do not wish to receive emails with updates and offers.
                </span>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Mobile phone number *</label>
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Country Code Dropdown */}
                <select
                  className="w-full sm:w-1/4 p-2 border rounded-lg bg-white"
                  defaultValue="TZA"
                >
                  <option value="TZA">TZA +255</option>
                  <option value="USA">USA +1</option>
                  <option value="GBR">GBR +44</option>
                  <option value="IND">IND +91</option>
                  <option value="KEN">KEN +254</option>
                </select>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  name="phone"
                  className="w-full sm:w-3/4 p-2 border rounded-lg"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
          </form>
        </div>

        {/* Right Card: Carousel and Additional Information */}
        <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            {title}
            {packageData.id === "4" && (
              <span className="ml-2 inline-block bg-gradient-to-r from-amber-500 to-yellow-300 text-white text-xs font-bold px-3 py-1 rounded-full">
                PREMIUM
              </span>
            )}
          </h2>
          <p className="text-base sm:text-lg mb-4">Package Details</p>

          {/* Carousel Section */}
          <div className="relative mb-6">
            <Swiper
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{ dynamicBullets: true }}
              modules={[Autoplay, Navigation, Pagination]}
              className="mySwiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              draggable={true}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${title} ${index + 1}`}
                    className="w-full h-48 sm:h-64 object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-sm cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-sm cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="mb-4">
            <p>Package Price: {price}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Special Requests (optional)</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="4"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Bottom Row: Two Cards Side by Side */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
        {/* Left Card: Payment Method */}
        <div className="w-full lg:w-2/3">
        
        </div>

        {/* Right Card: Price Details */}
        <div className="w-full lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Price details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Package Price</span>
              <span>{price}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes and fees</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{price}</span>
            </div>
          </div>

   

          <p className="text-sm text-gray-600 mt-4">
            Taxes and Fees due at the property are based on current exchange rates, and are payable in local currency.
          </p>

          {/* Cancellation Policy Section */}
          <div className="mt-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Cancellation policy</h2>
            <p className="text-sm text-gray-600">
              This rate is non-refundable. If you change or cancel your booking you will not get a refund or credit to use for a future stay.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-700 text-white px-4 sm:px-6 py-2 w-full mt-6"
            onClick={() => initiatePayment(packageData.id, packageData.price)}
            disabled={loading}
          >
            {loading ? "Redirecting to Payment..." : "Book Now"}
          </button>
          {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>}
        </div>
      </div>
    </div>
  );
};

const Booking = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
};

export default Booking;