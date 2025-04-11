import { Box, Flex, Text, VStack, useColorModeValue } from "@chakra-ui/react";

export default function OrderSummary({ orderId, date, total }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const labelColor = useColorModeValue("gray.500", "gray.400");
  const valueColor = useColorModeValue("gray.700", "white");
  const totalColor = useColorModeValue("orange.500", "orange.300");

  return (
    <Box bg={cardBg} p={6} borderRadius="lg" shadow="sm" border="1px" borderColor="gray.200">
      {/* Section Title */}
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Summary
      </Text>

      <VStack spacing={4} align="stretch">
        {/* Order ID */}
        <Flex justify="space-between">
          <Text color={labelColor} fontSize="sm">
            Order ID
          </Text>
          <Text fontWeight="medium" color={valueColor}>
            #{orderId}
          </Text>
        </Flex>

        {/* Order Date */}
        <Flex justify="space-between">
          <Text color={labelColor} fontSize="sm">
            Date
          </Text>
          <Text fontWeight="medium" color={valueColor}>
            {date}
          </Text>
        </Flex>

        {/* Order Total */}
        <Flex justify="space-between" borderTopWidth="1px" borderColor="gray.200" pt={3}>
          <Text fontWeight="bold" color={valueColor}>
            Total
          </Text>
          <Text fontWeight="bold" color={totalColor}>
            ${total.toFixed(2)}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
}
