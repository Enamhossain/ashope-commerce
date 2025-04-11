import React from "react";
import { Box, Image, Text, Flex, Button, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore";
import { Trash2 } from "lucide-react";

const Favorites = () => {
  const { favoriteProduct, removeFromFavorite } = useCartStore();

  return (
    <Box p={6} maxW="900px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Favorite Products ❤️
      </Text>

      {favoriteProduct.length === 0 ? (
        <Text fontSize="lg" color="gray.500" textAlign="center">
          No favorite products yet.
        </Text>
      ) : (
        <Flex direction="column" gap={4}>
          {favoriteProduct.map((product) => (
            <Box
              key={product._id}
              bg="white"
              p={4}
              borderRadius="lg"
              boxShadow="lg"
              transition="0.3s"
              _hover={{ shadow: "xl", transform: "scale(1.02)" }}
            >
              <Flex
                direction={{ base: "column", md: "row" }}
                align="center"
                gap={6}
              >
                {/* Product Image */}
                <Link to={`/products/productdetails/${product._id}`}>
                  <Image
                    src={product?.images?.[0]}
                    alt={product.productName}
                    borderRadius="lg"
                    w={{ base: "100%", md: "160px" }}
                    h={{ base: "auto", md: "160px" }}
                    objectFit="cover"
                    transition="0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Link>

                {/* Product Details */}
                <Box flex="1">
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    bg="blue.500"
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="md"
                    display="inline-block"
                  >
                    {product.category} {" > "} {product.nestedSubcategory}
                  </Text>

                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    mt={3}
                    _hover={{ textDecoration: "underline", color: "blue.600" }}
                  >
                    {product.productName}
                  </Text>

                  <Text fontSize="sm" color="gray.600" mt={2}>
                    {product.description?.substring(0, 100)}...
                  </Text>

                  <Flex align="center" justify="space-between" mt={4}>
                    <Text fontSize="xl" fontWeight="bold" color="blue.600">
                      ${product.price}
                    </Text>

                    <Button
                      size="sm"
                      colorScheme="red"
                      leftIcon={<Trash2 size={16} />}
                      onClick={() => removeFromFavorite(product._id)}
                      transition="0.3s"
                      _hover={{ bg: "red.600" }}
                    >
                      Remove
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Favorites;
