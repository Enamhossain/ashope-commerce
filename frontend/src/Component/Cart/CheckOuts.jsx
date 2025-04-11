import React, { useState } from 'react';
import FormattedPrice from "./FormattedPrice";
import useCartStore from "../../store/cartStore";
const CheckOuts = () => {
    const [paymentMethod, setPaymentMethod] = useState("bkash");
    const [bkashNumber, setBkashNumber] = useState("");
    const [bkashTransaction, setBkashTransaction] = useState("");
    const {
      cartProduct,
      orderTotal,
      calculateSubtotal,
      totalAmt,
      calculateShipping,
      calculateOrderTotal,
    } = useCartStore();
  
    const shippingAmt = calculateShipping();  // Calculate shipping amount
  
    const totalWithShipping = calculateOrderTotal(orderTotal) ;  // Calculate total with shipping
  
    return (
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4">
        {/* Left Column - Billing Details */}
        <div className="flex-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            বিলিং তথ্য / Billing Information
          </h2>
  
          <form>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm mb-1">
                নাম/Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm mb-1">
                ফোন নাম্বার/Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full border border-gray-300 rounded p-2"
                required
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm mb-1">
                ইমেইল ঠিকানা / Email <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 rounded-l p-2"
                  required
                />
                <button className="bg-green-500 text-white px-2 rounded-r">
                  <span className="sr-only">Verify</span>✓
                </button>
              </div>
            </div>
  
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm mb-1">
                ঠিকানা / Address
              </label>
              <input
                type="text"
                id="address"
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm mb-1">
                অর্ডার নোট <span className="text-gray-500">(ঐচ্ছিক)</span>
              </label>
              <textarea
                id="notes"
                rows="4"
                placeholder="অর্ডার সম্পর্কিত কোনো বিশেষ নির্দেশনা"
                className="w-full border border-gray-300 rounded p-2"
              ></textarea>
            </div>
          </form>
        </div>
  
        {/* Right Column - Order Summary */}
        <div className="flex-1 border border-gray-200 p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">আপনার অর্ডার</h2>
  
          <div className="border-b pb-2 mb-2">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span>প্রোডাক্ট</span>
              <span>ডেলিভারি</span>
              <span>মোট</span>
            </div>
  
            {cartProduct.map((product) => {
              return (
                <div
                  key={product._id}
                  className="flex justify-between text-sm mb-4"
                >
                  <span>
                    {product.name} × {product.quantity}
                  </span>
                  <span>৳ {shippingAmt}</span> {/* Shipping for the product */}
                  <span>৳ {totalAmt.regular}</span> {/* Total price for the product */}
                </div>
              );
            })}
  
            {/* Display the total including shipping */}
            <div className="flex justify-between text-sm font-semibold">
              <span>মোট</span>
              <span>
                ৳ <FormattedPrice amount={totalWithShipping} />
              </span>{" "}
              {/* Final total calculation including shipping */}
            </div>
          </div>
  
          {/* Payment Methods */}
          <div className="mb-6">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  id="bkash"
                  name="paymentMethod"
                  checked={paymentMethod === "bkash"}
                  onChange={() => setPaymentMethod("bkash")}
                  className="h-4 w-4"
                />
                <label htmlFor="bkash" className="flex items-center">
                  <span className="mr-2">bKash</span>
                  <img src="/api/placeholder/50/30" alt="bKash" className="h-6" />
                </label>
              </div>
  
              {paymentMethod === "bkash" && (
                <div className="pl-6 mb-4">
                  <p className="text-sm mb-2">
                    প্রথমে bKash দিয়ে পেমেন্ট করুন, তারপর নিচের ফর্ম পূরণ করুন।
                  </p>
                  <p className="text-sm mb-2">
                    bKash এজেন্ট নাম্বার: <strong>01748444048</strong>
                  </p>
                  <div className="mb-2">
                    <label htmlFor="bkashNumber" className="block text-sm mb-1">
                      bKash নাম্বার
                    </label>
                    <input
                      type="text"
                      id="bkashNumber"
                      placeholder="01700000000"
                      value={bkashNumber}
                      onChange={(e) => setBkashNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="bkashTransaction"
                      className="block text-sm mb-1"
                    >
                      bKash ট্রানজেকশন আইডি
                    </label>
                    <input
                      type="text"
                      id="bkashTransaction"
                      placeholder="8N7AR2XST7M"
                      value={bkashTransaction}
                      onChange={(e) => setBkashTransaction(e.target.value)}
                      className="w-full border border-gray-300 rounded p-2"
                    />
                  </div>
                </div>
              )}
            </div>
  
            {/* Other Payment Methods (Rocket, Nagad, etc.) */}
            <div className="mb-2">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="rocket"
                  name="paymentMethod"
                  checked={paymentMethod === "rocket"}
                  onChange={() => setPaymentMethod("rocket")}
                  className="h-4 w-4"
                />
                <label htmlFor="rocket" className="flex items-center">
                  <span className="mr-2">Rocket</span>
                </label>
              </div>
            </div>
  
            <div className="mb-4">
              <button className="w-full bg-red-600 text-white py-3 font-bold rounded hover:bg-red-700 transition">
                অর্ডার করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default CheckOuts;