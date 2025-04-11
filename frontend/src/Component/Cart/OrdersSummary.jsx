import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import FormattedPrice from "./FormattedPrice"; // Assuming this component formats price
import CheckoutButton from "./CheckoutButton"; // Custom CheckoutButton component
import { Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useCartStore from "../../store/cartStore";
const OrdersSummary = ({ items, total }) => {
  const {
    cartProduct,
    totalAmt,
    calculateSubtotal,
    calculateShipping,
    calculateOrderTotal,
    couponCode,
    setCouponCode,
    discount,
    applyCoupon,
  } = useCartStore();

  console.log(totalAmt, "totalAmt");
  useEffect(() => {
    calculateSubtotal(); // Update subtotal when cart changes
  }, [cartProduct]);

  const shippingAmt = calculateShipping();
  const orderTotal = calculateOrderTotal();

  return (
    <section className="bg-gray-50 p-6 rounded-lg lg:col-span-5 shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
      <dl className="mt-6 space-y-4">
        {/* Subtotal */}
        <div className="flex justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-semibold text-gray-900">
            <FormattedPrice amount={totalAmt.regular} />
          </dd>
        </div>

        {/* Shipping Estimate */}
        <div className="flex justify-between border-t border-gray-200 pt-4">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Shipping Estimate</span>
            <FaQuestionCircle className="h-5 w-5 text-gray-400 ml-2" />
          </dt>
          <dd className="text-sm font-semibold text-gray-900">
            {shippingAmt > 0 ? (
              <FormattedPrice amount={shippingAmt} />
            ) : (
              <span className="text-green-600">Free</span>
            )}
          </dd>
        </div>

        {/* Coupon Input */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700">
            Apply Coupon
          </label>
          <div className="flex mt-2">
            <Input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="border border-gray-300 p-2 rounded-l-md w-full"
            />
            <Button
              onClick={applyCoupon}
              className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-black"
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Discount Amount */}
        {discount > 0 && (
          <div className="flex justify-between border-t border-gray-200 pt-4">
            <dt className="text-sm text-gray-600">Coupon Discount</dt>
            <dd className="text-sm font-semibold text-green-600">
              - <FormattedPrice amount={discount} />
            </dd>
          </div>
        )}

        {/* Order Total */}
        <div className="flex justify-between border-t border-gray-200 pt-4">
          <dt className="text-lg font-bold text-gray-900">Order Total</dt>
          <dd className="text-lg font-bold text-gray-900">
            <FormattedPrice amount={orderTotal} />
          </dd>
        </div>
      </dl>

      {/* Checkout Button */}
      <CheckoutButton />
    </section>
  );
};

export default OrdersSummary;
