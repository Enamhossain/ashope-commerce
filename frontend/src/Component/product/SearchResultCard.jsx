import React, { useMemo, useState } from 'react';
import { Box, Image, Text, Button, Flex, Badge, HStack, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ShoppingCart, ImageOff } from "lucide-react";
import FormattedPrice from '../Cart/FormattedPrice';

// Inline SVG placeholder — zero network requests, never breaks
const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23555'%3ENo Image%3C/text%3E%3C/svg%3E";

const SearchResultCard = ({ product, setSearchText }) => {
  const cardWidth = useBreakpointValue({ base: "full", sm: "320px", md: "350px" });
  const imageHeight = useBreakpointValue({ base: "180px", md: "220px" });

  const discountedPrice = useMemo(() => {
    if (product?.discount && Number(product.discount) > 0) {
      return (
        Number(product.price) *
        (1 - Number(product.discount) / 100)
      ).toFixed(2);
    }
    return product?.price;
  }, [product?.price, product?.discount]);

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
          src={product?.images?.[0] || PLACEHOLDER_IMG}
          alt={product.productName}
          width="100%"
          height="100%"
          objectFit="cover"
          borderRadius="lg"
          loading="lazy"
          onError={(e) => { e.target.src = PLACEHOLDER_IMG; }}
          fallbackSrc={PLACEHOLDER_IMG}
        />
        <Badge
          position="absolute"
          top={2}
          right={2}
          bg={product?.stock > 0 ? "primary" : "gray.600"}
          color="white"
          fontSize="xs"
          px={3}
          py={1}
          borderRadius="full"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {product?.stock > 0 ? "In Stock" : "Out of Stock"}
        </Badge>
      </Box>

      {/* Product Details */}
      <Flex direction="column" gap={3}>
        {/* Category & Subcategory */}
        <HStack spacing={2}>
          <Badge variant="outline" borderColor="primary" color="primary" fontSize="10px" px={2} py={0.5}>
            {product.category}
          </Badge>
          <Badge bg="black" color="white" fontSize="10px" px={2} py={0.5}>
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
            <Text fontSize="lg" fontWeight="bold" color="primary">
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
                    <Text color="var(--primary)" fontSize="lg" fontWeight="bold">
                      <FormattedPrice
                        amount={discountedPrice}
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
          bg="black"
          color="white"
          _hover={{ bg: "primary", transform: "translateY(-2px)" }}
          onClick={() => setSearchText("")}
          rightIcon={<ShoppingCart size={18} />}
          transition="all 0.3s"
          borderRadius="xl"
        >
          View Details
        </Button>
      </Link>
    </Box>
  );
};


export default SearchResultCard;
