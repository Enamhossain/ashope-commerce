import useCartStore from "../../store/cartStore";

import { Container } from "@chakra-ui/react";
import CartProducts from "./CartProducts";
import { Link } from "react-router-dom";


import CheckoutButton from "./CheckoutButton";
import OrdersSummary from "./OrdersSummary";


const Cart = () => {
  const { cartProduct } = useCartStore();

  return (
    <Container maxW="7xl" className="py-10">
      {cartProduct.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <p className="text-xl text-red-600 mt-2 text-center">
            ৩০০০ টাকা বা তার বেশি অর্ডার করলে ডেলিভারি ফ্রি
          </p>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items Section */}
            <section className="lg:col-span-7">
              <div className="border-t border-b border-gray-200 divide-y">
                {cartProduct.map((product) => (
                  <CartProducts product={product} key={product?._id} />
                ))}
              </div>

              <div className="mb-4">
                <label htmlFor="notes" className="block text-sm mb-1">
                  অর্ডার নোট <span className="text-gray-500">(ঐচ্ছিক)</span>
                </label>
                <textarea
                  id="notes"
                  rows="4"
                  placeholder="অর্ডার সম্পর্কিত কোনো বিশেষ নির্দেশনা"
                  className="w-full border border-gray-300 rounded p-2"
                ></textarea>
              </div>
            </section>

            {/* Note */}

            {/* Order Summary Section */}
            <OrdersSummary/>
            
    
          </div>
        </>
      ) : (
        <div className="bg-white h-96 flex flex-col gap-3 items-center justify-center py-5 rounded-lg border border-gray-200 shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-lg max-w-md text-center text-gray-600">
            Your cart is empty. Start shopping now and find amazing products!
          </p>
          <Link
            to={"/"}
            className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-black duration-200 uppercase text-sm font-semibold tracking-wide"
          >
            Browse Products
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Cart;
