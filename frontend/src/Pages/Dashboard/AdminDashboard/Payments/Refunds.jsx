import React from 'react';

const Refunds = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6">Refunds</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Order ID</th>
                                <th className="py-2 px-4 border-b">Customer</th>
                                <th className="py-2 px-4 border-b">Amount</th>
                                <th className="py-2 px-4 border-b">Status</th>
                                <th className="py-2 px-4 border-b">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example row */}
                            <tr>
                                <td className="py-2 px-4 border-b">12345</td>
                                <td className="py-2 px-4 border-b">John Doe</td>
                                <td className="py-2 px-4 border-b">$100.00</td>
                                <td className="py-2 px-4 border-b">Pending</td>
                                <td className="py-2 px-4 border-b">2023-10-01</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Refunds;