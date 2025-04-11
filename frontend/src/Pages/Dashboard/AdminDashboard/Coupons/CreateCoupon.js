// import React, { useState } from 'react';

// const CreateCoupon = () => {
//     const [couponCode, setCouponCode] = useState('');
//     const [discount, setDiscount] = useState('');
//     const [expiryDate, setExpiryDate] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission logic here
//         console.log({ couponCode, discount, expiryDate });
//     };

//     return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold mb-6">Create Coupon</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="couponCode">
//                         Coupon Code
//                     </label>
//                     <input
//                         type="text"
//                         id="couponCode"
//                         value={couponCode}
//                         onChange={(e) => setCouponCode(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discount">
//                         Discount (%)
//                     </label>
//                     <input
//                         type="number"
//                         id="discount"
//                         value={discount}
//                         onChange={(e) => setDiscount(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
//                         Expiry Date
//                     </label>
//                     <input
//                         type="date"
//                         id="expiryDate"
//                         value={expiryDate}
//                         onChange={(e) => setExpiryDate(e.target.value)}
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         required
//                     />
//                 </div>
//                 <div className="flex items-center justify-between">
//                     <button
//                         type="submit"
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     >
//                         Create Coupon
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CreateCoupon;