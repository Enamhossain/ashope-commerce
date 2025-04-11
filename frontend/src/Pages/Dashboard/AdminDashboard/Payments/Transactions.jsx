import React from 'react';

const transactions = [
    { id: 1, name: 'Payment 1', amount: '$100', date: '2023-10-01' },
    { id: 2, name: 'Payment 2', amount: '$200', date: '2023-10-02' },
    { id: 3, name: 'Payment 3', amount: '$300', date: '2023-10-03' },
];

const Transactions = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200">ID</th>
                            <th className="py-2 px-4 bg-gray-200">Name</th>
                            <th className="py-2 px-4 bg-gray-200">Amount</th>
                            <th className="py-2 px-4 bg-gray-200">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-t">
                                <td className="py-2 px-4">{transaction.id}</td>
                                <td className="py-2 px-4">{transaction.name}</td>
                                <td className="py-2 px-4">{transaction.amount}</td>
                                <td className="py-2 px-4">{transaction.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;