import React from "react";
import FormattedPrice from "./FormattedPrice";

const PriceTag = ({ regularPrice, discountedPrice }) => {
  console.log("PriceTag -> regularPrice", regularPrice , discountedPrice);
  return (
    <div className="flex items-center gap-2">
      {regularPrice !== discountedPrice && (
        <p className="line-through text-gray-500 font-medium">
          <FormattedPrice amount={regularPrice} />
        </p>
      )}
      <p className="font-bold text-skyText">
        <FormattedPrice amount={discountedPrice} />
      </p>
    </div>
  );
};

export default PriceTag;
