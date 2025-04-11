// import React, { useState } from 'react';

// const ManageCoupons = () => {
//     const [coupons, setCoupons] = useState([]);
//     const [newCoupon, setNewCoupon] = useState('');

//     const handleAddCoupon = () => {
//         if (newCoupon.trim()) {
//             setCoupons([...coupons, newCoupon]);
//             setNewCoupon('');
//         }
//     };

//     const handleDeleteCoupon = (index) => {
//         const updatedCoupons = coupons.filter((_, i) => i !== index);
//         setCoupons(updatedCoupons);
//     };

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4">Manage Coupons</h1>
//             <div className="mb-4">
//                 <input
//                     type="text"
//                     value={newCoupon}
//                     onChange={(e) => setNewCoupon(e.target.value)}
//                     className="border p-2 mr-2"
//                     placeholder="Enter new coupon"
//                 />
//                 <button
//                     onClick={handleAddCoupon}
//                     className="bg-blue-500 text-white p-2 rounded"
//                 >
//                     Add Coupon
//                 </button>
//             </div>
//             <ul>
//                 {coupons.map((coupon, index) => (
//                     <li key={index} className="flex justify-between items-center mb-2">
//                         <span>{coupon}</span>
//                         <button
//                             onClick={() => handleDeleteCoupon(index)}
//                             className="bg-red-500 text-white p-2 rounded"
//                         >
//                             Delete
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ManageCoupons;