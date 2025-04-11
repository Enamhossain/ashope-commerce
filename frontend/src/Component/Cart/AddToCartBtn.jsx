import React, { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import PriceTag from "./PriceTag"; // Assuming PriceTag component exists
import { useToast } from "@chakra-ui/react";
import useCartStore from "../../store/cartStore";

const AddToCartBtn = ({ title, product, showPrice = true }) => {
  const [existingProduct, setExistingProduct] = useState(null);
  const { cartProduct, addToCart, decreaseQuantity } = useCartStore();
  const toast = useToast();

  useEffect(() => {
    if (product?._id) {
      const availableItem = cartProduct.find((item) => item?._id === product?._id);
      setExistingProduct(availableItem || null);
    }
  }, [product, cartProduct]);

  const handleAddToCart = () => {
    if (!product) {
      toast({
        title: "Product is undefined!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    addToCart(product);
    
  };

  const handleDeleteProduct = () => {
    if (existingProduct?.quantity > 1) {
      decreaseQuantity(existingProduct?._id);
     
    } else {
      toast({
        title: "You cannot decrease quantity below 1",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getPrice = () => {
    const unitPrice = product?.price || 0;
    return existingProduct ? unitPrice * existingProduct?.quantity : unitPrice;
  };

  return (
    <>
      {showPrice && (
        <div>
          <PriceTag price={getPrice()} />
        </div>
      )}
      {existingProduct ? (
        <div className="flex self-center items-center justify-center gap-2">
          <button
            onClick={handleDeleteProduct}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaMinus />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {existingProduct?.quantity}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart}>
          {title ? title : "Add to Cart"}
        </button>
      )}
    </>
  );
};

export default AddToCartBtn;
