import { Box, Flex, Text, Image, VStack, useColorModeValue } from "@chakra-ui/react";

export default function OrderItem({ image, name, quantity, price }) {
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex
      gap={4}
      py={4}
      borderBottomWidth="1px"
      borderColor={borderColor}
      align="center"
    >
      {/* Product Image */}
      <Image
        src={image}
        alt={name}
        boxSize="70px"
        objectFit="cover"
        borderRadius="md"
        shadow="sm"
      />

      {/* Product Details */}
      <Box flex={1}>
        <VStack align="stretch" spacing={1}>
          <Text color={textColor} fontSize="sm">
            Product name
          </Text>
          <Text fontWeight="semibold" fontSize="md">
            {name}
          </Text>
        </VStack>
      </Box>

      {/* Quantity */}
      <Box>
        <VStack align="stretch" spacing={1}>
          <Text color={textColor} fontSize="sm">
            Quantity
          </Text>
          <Text fontWeight="medium">{quantity}</Text>
        </VStack>
      </Box>

      {/* Price */}
      <Box>
        <VStack align="stretch" spacing={1}>
          <Text color={textColor} fontSize="sm">
            Price
          </Text>
          <Text fontWeight="semibold" fontSize="md">
            ${price.toFixed(2)}
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}
