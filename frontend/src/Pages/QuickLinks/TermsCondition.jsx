import React from "react";

const TermsCondition = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Terms and Conditions</h1>
        <p className="text-gray-600 mb-4">Welcome to SquadPark!</p>
        <p className="text-gray-600 mb-4">
          These terms and conditions outline the rules and regulations for the
          use of SquadPark's Website, located at www.squadpark.com.
        </p>
        <p className="text-gray-600 mb-6">
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use SquadPark if you do not agree to
          take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Cookies</h2>
        <p className="text-gray-600 mb-4">
          We employ the use of cookies. By accessing SquadPark, you agreed to
          use cookies in agreement with SquadPark's Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">License</h2>
        <p className="text-gray-600 mb-4">
          Unless otherwise stated, SquadPark and/or its licensors own the
          intellectual property rights for all material on SquadPark. All
          intellectual property rights are reserved.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">You must not:</h2>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Republish material from SquadPark</li>
          <li>Sell, rent, or sub-license material from SquadPark</li>
          <li>Reproduce, duplicate, or copy material from SquadPark</li>
          <li>Redistribute content from SquadPark</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Hyperlinking to our Content</h2>
        <p className="text-gray-600 mb-4">The following organizations may link to our Website without prior written approval:</p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Government agencies</li>
          <li>Search engines</li>
          <li>News organizations</li>
          <li>Online directory distributors</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">iFrames</h2>
        <p className="text-gray-600 mb-4">
          Without prior approval and written permission, you may not create frames
          around our Webpages that alter in any way the visual presentation or
          appearance of our Website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Content Liability</h2>
        <p className="text-gray-600 mb-4">
          We shall not be held responsible for any content that appears on your Website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Disclaimer</h2>
        <p className="text-gray-600 mb-4">
          To the maximum extent permitted by applicable law, we exclude all representations,
          warranties, and conditions relating to our website and the use of this website.
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-6">
          <li>Limit or exclude liability for death or personal injury</li>
          <li>Limit or exclude liability for fraud or misrepresentation</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsCondition;