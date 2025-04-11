import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Carousel from "../carosule/carosule";
import { memo, useCallback, useMemo, useState, useEffect } from "react";
import { ChevronRight, Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import FormattedPrice from "../Cart/FormattedPrice";

const ProductCard = memo(({ product }) => {
  const { addToCart, addToFavorite } = useCartStore();
  const [selectedSize, setSelectedSize] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  // Memoized discount price calculation
  const discountPrice = useMemo(() => {
    return product.discount && Number(product.discount) > 0
      ? (product.price * (1 - Number(product.discount) / 100)).toFixed(2)
      : product.price;
  }, [product.price, product.discount]);

  const [isFavorite, setIsFavorite] = useState(product.isFavorite); // Track the favorite status

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        // Remove from favorites
        await removeFromFavorite(product);
        setIsFavorite(false);
      } else {
        // Add to favorites
        await addToFavorite(product);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  // Handle size selection
  const handleSizeSelect = useCallback((size) => setSelectedSize(size), []);

  // Handle add to cart
  const handleAddToCart = useCallback(() => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast({
        title: "Select a size",
        description: "Please select a size before adding to cart.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    // Calculate the discounted price
    const finalPrice =
      product.discount && Number(product.discount) > 0
        ? (product.price * (1 - Number(product.discount) / 100)).toFixed(2)
        : product.price;
  
    addToCart({ ...product, selectedSize: selectedSize || null, price: finalPrice });
  
    toast({
      title: `${product?.nestedSubcategory} added successfully!`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [selectedSize, addToCart, product, toast]);
  

  // Memoized carousel slides
  const carouselSlides = useMemo(
    () =>
      product?.images?.map((img, index) => ({
        img,
        alt: `Product image ${index + 1}`,
      })) || [],
    [product.images]
  );

  return (
    <Box>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut" }}
      >
        <Container
          className="group"
          bg="white"
          rounded="lg"
          overflow="hidden"
          mx="-0.5"
          shadow="sm"
          _hover={{ shadow: "xl", border: "1px ", color: "red.500" }}
          transition="all 0.3s ease-in-out"
          h={{ base: "auto", md: "400px" }}
          w={{ base: "85%", md: "100%" }}
          maxWidth={"500px"}
          display="flex"
          flexDirection="column"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Box position="relative" w="full" h="full" overflow="hidden" flex="1">
            <Carousel
              slides={carouselSlides}
              interval={5000}
              className="w-full h-full"
            />

            {/* Favorite & View Details */}
            <Flex
              direction="column"
              gap={3}
              position="absolute"
              top={4}
              right={4}
            >
              <IconButton
                aria-label="Toggle Favorite"
                size="sm"
                variant="solid"
                borderRadius="full"
                icon={
                  <Heart
                    className="w-5 h-5"
                    fill={isFavorite ? "red" : "none"} // Use the isFavorite state
                  />
                }
                color={isFavorite ? "red.500" : "gray.500"} // Use the isFavorite state
                onClick={toggleFavorite}
              />
              <Link to={`/products/productdetails/${product._id}`}>
                <IconButton
                  aria-label="View Details"
                  icon={<Eye className="w-5 h-5" />}
                  size="sm"
                  variant="solid"
                  borderRadius="full"
                />
              </Link>
            </Flex>

            {/* Add to Cart Button */}
            {(isHovered || isMobile) && (
              <Button
                leftIcon={<ShoppingCart className="w-4 h-4" />}
                color="gray.950"
                variant="solid"
                size="md"
                fontWeight="medium"
                borderRadius="full"
                boxShadow="lg"
                px={6}
                py={2}
                position="absolute"
                bottom="16px"
                left="30%"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            )}
          </Box>

          {/* Product Details */}
          <Box p={4}>
            <Flex fontSize="sm" color="gray.500" align="center">
              <Text>{product.subcategory}</Text>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Text fontWeight="medium">{product.nestedSubcategory}</Text>
            </Flex>

            <Flex
              justify="space-between"
              align="center"
              fontWeight="semibold"
              color="gray.900"
              mt={2}
            >
              <Text fontSize={["sm", "md", "lg"]} isTruncated maxW="250px">
                {product.productName}
              </Text>

              <Flex align="center" gap={2}>
                {product.discount && Number(product.discount) > 0 ? (
                  <>
                    <Text
                      color="gray.500"
                      textDecoration="line-through"
                      fontSize="sm"
                    >
                      <FormattedPrice amount={Number(product.price)} />
                    </Text>
                    <Text color="red.500" fontSize="lg" fontWeight="bold">
                      <FormattedPrice amount={discountPrice} />
                    </Text>
                  </>
                ) : (
                  <Text color="black" fontSize="xl" fontWeight="bold">
                    <FormattedPrice amount={Number(product.price)} />
                  </Text>
                )}
              </Flex>
            </Flex>

            {/* Size Selection (For Men's Wear) */}
            {["Men", "Men's Wear"].includes(product.subcategory) &&
              product?.sizes?.length > 0 && (
                <Flex mt={3} flexWrap="wrap" gap={2}>
                  {product.sizes.map((sizeObj) => (
                    <Text
                      key={sizeObj.size}
                      onClick={() => handleSizeSelect(sizeObj.size)}
                      bg={selectedSize === sizeObj.size ? "blue.500" : "white"}
                      color={
                        selectedSize === sizeObj.size ? "white" : "gray.700"
                      }
                      fontSize="sm"
                      px={4}
                      py={1}
                      border="1px solid"
                      borderColor="gray.300"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: "blue.600", color: "white" }}
                    >
                      {sizeObj.size}{" "}
                      {sizeObj.quantity ? `- x${sizeObj.quantity}` : ""}
                    </Text>
                  ))}
                </Flex>
              )}
          </Box>
        </Container>
      </motion.div>
    </Box>
  );
});

export default ProductCard;
