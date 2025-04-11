import React from "react";
import { Link } from "react-router-dom";

const ShippingInformation = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="max-w-2xl w-full bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Shipping Information
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          Find all the details about our shipping policies and procedures below.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Shipping Methods</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Standard Shipping:</strong> 5-7 business days</li>
              <li><strong>Express Shipping:</strong> 2-3 business days</li>
              <li><strong>Overnight Shipping:</strong> 1 business day</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Shipping Rates</h2>
            <p className="text-gray-700">Shipping rates are calculated based on the weight of your order and the selected shipping method.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">International Shipping</h2>
            <p className="text-gray-700">We offer international shipping to select countries. Please check our international shipping policy for more details.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tracking Your Order</h2>
            <p className="text-gray-700">Once your order has been shipped, you will receive a tracking number via email. You can use this number to track your order on our website.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Contact Us</h2>
            <p className="text-gray-700">If you have any questions about our shipping policies, please contact our customer support team.</p>
            <Link to="/customer-support" className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInformation;
