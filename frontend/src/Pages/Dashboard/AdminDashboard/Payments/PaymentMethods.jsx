import React from 'react';

const PaymentMethods = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Credit Card</h2>
                    <p className="text-gray-600">Visa, MasterCard, American Express</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">PayPal</h2>
                    <p className="text-gray-600">Secure online payments</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Bank Transfer</h2>
                    <p className="text-gray-600">Direct bank transfers</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethods;