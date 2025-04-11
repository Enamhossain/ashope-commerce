import { Box, Flex, Text, VStack, useColorModeValue } from "@chakra-ui/react";

export default function ShippingInfo({ address, paymentMethod, expectedDate }) {
  const cardBg = useColorModeValue("white", "gray.800");
  const titleColor = useColorModeValue("gray.700", "white");
  const contentColor = useColorModeValue("gray.500", "gray.400");
  const buttonBg = useColorModeValue("blue.50", "blue.900");
  const buttonHoverBg = useColorModeValue("blue.100", "blue.700");

  return (
    <VStack spacing={8} align="stretch">
    
      <Box
        bg={cardBg}
        p={8}
        borderRadius="xl"
        shadow="sm"
        border="1px"
        borderColor="gray.200"
        mb={4}
      >
        <Text fontSize="xl" fontWeight="bold" color={titleColor} mb={5}>
          Shipping Address
        </Text>
        <Text fontSize="md" lineHeight="tall" color={contentColor}>
          {address}
        </Text>
      </Box>

      <Box
        bg={cardBg}
        p={8}
        borderRadius="xl"
        shadow="sm"
        border="1px"
        borderColor="gray.200"
        mb={4}
      >
        <Text fontSize="xl" fontWeight="bold" color={titleColor} mb={5}>
          Payment Method
        </Text>
        <Text fontSize="md" lineHeight="tall" color={contentColor}>
          {paymentMethod}
        </Text>
      </Box>


      <Box
        bg={cardBg}
        p={8}
        borderRadius="xl"
        shadow="sm"
        border="1px"
        borderColor="gray.200"
        mb={4}
      >
        <Text fontSize="xl" fontWeight="bold" color={titleColor} mb={5}>
          Expected Date Of Delivery
        </Text>
        <Text fontSize="md" fontWeight="medium" color="green.500" mb={4}>
          {expectedDate}
        </Text>
        <Box
          as="button"
          mt={2}
          w="full"
          py={3}
          border="1px"
          borderColor="blue.500"
          borderRadius="md"
          bg={buttonBg}
          color="blue.500"
          fontWeight="bold"
          fontSize="md"
          textAlign="center"
          _hover={{ bg: buttonHoverBg }}
        >
          🚚 Track Order
        </Box>
      </Box>
    </VStack>
  );
}
