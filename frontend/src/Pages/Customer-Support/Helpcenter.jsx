import React, { useState } from "react";

const HelpCenter = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email.",
      open: false,
    },
    {
      question: "What is the return policy?",
      answer: "You can return items within 30 days of purchase. Please check our return policy page for details.",
      open: false,
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to select countries. Shipping rates and times vary based on location.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => (i === index ? { ...faq, open: !faq.open } : faq))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="max-w-2xl w-full bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Help Center
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          How can we assist you today?
        </p>
        <form className="space-y-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Contact Support</h2>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" id="name" type="text" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" id="email" type="email" placeholder="Your email" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
            <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm" id="message" placeholder="Your message" rows="4"></textarea>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md" type="submit">Submit</button>
        </form>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <button onClick={() => toggleFAQ(index)} className="w-full text-left text-gray-700 font-semibold flex justify-between items-center focus:outline-none">
                {faq.question}
                <span>{faq.open ? "−" : "+"}</span>
              </button>
              {faq.open && <p className="text-gray-600 mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
