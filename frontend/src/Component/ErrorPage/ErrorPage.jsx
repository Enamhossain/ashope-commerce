import { useRouteError } from "react-router-dom";
import { Box, Heading, Text, Button, VStack, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box 
      textAlign="center" 
      py={10} 
      px={6} 
      bg="gray.100" 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
    >
      <VStack spacing={5} p={8} bg="white" shadow="lg" borderRadius="lg" maxW="lg">
        <Heading as="h1" size="2xl" color="red.500">
          Oops!
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Something went wrong. The page you are looking for might have been removed or is temporarily unavailable.
        </Text>
        <Divider />
        {error && (
          <Text fontSize="sm" color="gray.500">
            Error: {error.statusText || error.message}
          </Text>
        )}
        <Button as={Link} to="/" colorScheme="blue" size="lg">
          Return Home
        </Button>
      </VStack>
    </Box>
  );
}
