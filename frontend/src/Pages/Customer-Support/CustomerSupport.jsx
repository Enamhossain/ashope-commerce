import React from "react";

const CustomerSupport = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl w-full bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Customer Support
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          How can we assist you today?
        </p>
        <form className="space-y-6">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              id="name"
              type="text"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              id="email"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              id="message"
              placeholder="Your message"
              rows="5"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerSupport;
