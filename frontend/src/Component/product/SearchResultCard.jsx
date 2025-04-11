import React from 'react';
import { Box, Image, Text, Button, Flex, Badge, HStack, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import FormattedPrice from '../Cart/FormattedPrice';
const SearchResultCard = ({ product, setSearchText }) => {
  const cardWidth = useBreakpointValue({ base: "full", sm: "320px", md: "350px" });
  const imageHeight = useBreakpointValue({ base: "180px", md: "220px" });

  return (
    <Box
      as="article"
      bg="white"
      p={4}
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      border="1px"
      borderColor="gray.100"
      w={cardWidth} // Responsive width
      mx="auto" // Centers it on mobile
    >
      {/* Product Image */}
      <Box position="relative" height={imageHeight} mb={4}>
        <Image
          src={product?.images?.[0] || "/api/placeholder/400/400"}
          alt={product.productName}
          width="100%"
          height="100%"
          objectFit="cover"
          borderRadius="lg"
        />
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme={product?.stock > 0 ? "green" : "red"}
          fontSize="sm"
          px={3}
          py={1}
          borderRadius="full"
        >
          {product?.stock > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
      </Box>

      {/* Product Details */}
      <Flex direction="column" gap={3}>
        {/* Category & Subcategory */}
        <HStack spacing={2}>
          <Badge colorScheme="blue" fontSize="xs" px={2} py={0.5}>
            {product.category}
          </Badge>
          <Badge colorScheme="purple" fontSize="xs" px={2} py={0.5}>
            {product.nestedSubcategory}
          </Badge>
        </HStack>

        {/* Product Name */}
        <Text fontSize="lg" fontWeight="bold" noOfLines={2} color="gray.800">
          {product.productName}
        </Text>

        {/* Price & CTA */}
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="blue.600">
            {product.discount && Number(product.discount) > 0 ? (
                  <>
                    {/* Original Price (Strikethrough) */}
                    <Text
                      color="gray.500"
                      textDecoration="line-through"
                      fontSize={["sm", "md"]}
                    >
                      <FormattedPrice amount={Number(product.price)} />
                    </Text>

                    {/* Discounted Price */}
                    <Text color="red.500" fontSize="lg" fontWeight="bold">
                      <FormattedPrice
                        amount={(
                          Number(product.price) *
                          (1 - Number(product.discount) / 100)
                        ).toFixed(2)}
                      />
                    </Text>
                  </>
                ) : (
                  /* If no discount, show regular price */
                  <Text color="black" fontSize="xl" fontWeight="bold">
                    <FormattedPrice amount={Number(product.price)} />
                  </Text>
                )}
            </Text>
            <Text fontSize="sm" color="gray.500" mt={-1}>
              Free shipping
            </Text>
          </Box>
        </Flex>
      </Flex>

      {/* View Details Button */}
      <Link to={`/products/productdetails/${product._id}`} style={{ display: "block", marginTop: "12px" }}>
        <Button
          width="full"
          size="md"
          colorScheme="teal"
          onClick={() => setSearchText("")}
          rightIcon={<ShoppingCart size={18} />}
          _hover={{ transform: "scale(1.05)" }}
        >
          View Details
        </Button>
      </Link>
    </Box>
  );
};


export default SearchResultCard;
