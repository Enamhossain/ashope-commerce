import { Box, Divider, Flex, Text, VStack, useColorModeValue } from "@chakra-ui/react";

export default function CartTotals({ subtotal, shipping, tax, total }) {
  // Color mode-dependent styles for better theming
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box
      bg={cardBg}
      borderRadius="lg"
      shadow="md"
      p={6}
      border="1px solid"
      borderColor={borderColor}
    >
      <Text fontSize="xl" fontWeight="bold" mb={4} color="orange.500">
        Cart Totals
      </Text>
      <VStack spacing={4} align="stretch">
        {/* Subtotal */}
        <Flex justify="space-between" fontSize="md">
          <Text color={textColor}>Subtotal:</Text>
          <Text fontWeight="medium">${subtotal.toFixed(2)}</Text>
        </Flex>

        {/* Shipping */}
        <Flex justify="space-between" fontSize="md">
          <Text color={textColor}>Shipping:</Text>
          <Text fontWeight="medium">${shipping.toFixed(2)}</Text>
        </Flex>

        {/* Tax */}
        <Flex justify="space-between" fontSize="md">
          <Text color={textColor}>Tax (GST):</Text>
          <Text fontWeight="medium">${tax.toFixed(2)}</Text>
        </Flex>

        {/* Divider */}
        <Divider borderColor={borderColor} />

        {/* Total */}
        <Flex justify="space-between" fontSize="lg">
          <Text fontWeight="bold">Total Price:</Text>
          <Text fontWeight="bold" color="orange.500">
            ${total.toFixed(2)}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
}
