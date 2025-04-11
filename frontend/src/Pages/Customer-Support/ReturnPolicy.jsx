import React from 'react';

const ReturnPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4">Return Policy</h1>
            <p className="text-gray-700 mb-4">
                At Ashop, we strive to ensure that our customers are completely satisfied with their purchases. If you are not satisfied with your purchase, you can return the product and get a full refund or exchange the product for another one.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Returns</h2>
            <p className="text-gray-700 mb-4">
                You can return a product for up to 30 days from the date you purchased it. Any product you return must be in the same condition you received it and in the original packaging. Please keep the receipt.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Refunds</h2>
            <p className="text-gray-700 mb-4">
                Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item. If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Shipping</h2>
            <p className="text-gray-700 mb-4">
                You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
            <p className="text-gray-700">
                If you have any questions on how to return your item to us, contact us at support@ashop.com.
            </p>
        </div>
    );
};

export default ReturnPolicy;