import React from 'react';
import { Container, Box, Heading, Text } from '@chakra-ui/react';

const FAQ = () => {
    return (
        <Container maxW="container.md" py={8}>
            <Heading as="h1" size="xl" mb={6} textAlign="center">
                Frequently Asked Questions
            </Heading>
            <Box bg="white" shadow="md" rounded="lg" p={6} mb={4}>
                <Heading as="h2" size="md" mb={2}>
                    What is your return policy?
                </Heading>
                <Text color="gray.700">
                    We accept returns within 30 days of purchase. Items must be in their original condition.
                </Text>
            </Box>
            <Box bg="white" shadow="md" rounded="lg" p={6} mb={4}>
                <Heading as="h2" size="md" mb={2}>
                    How can I track my order?
                </Heading>
                <Text color="gray.700">
                    Once your order is shipped, we will provide you with a tracking number via email.
                </Text>
            </Box>
            <Box bg="white" shadow="md" rounded="lg" p={6} mb={4}>
                <Heading as="h2" size="md" mb={2}>
                    Do you offer international shipping?
                </Heading>
                <Text color="gray.700">
                    Yes, we ship to select countries. Shipping costs and delivery times may vary.
                </Text>
            </Box>
            <Box bg="white" shadow="md" rounded="lg" p={6} mb={4}>
                <Heading as="h2" size="md" mb={2}>
                    Can I change or cancel my order?
                </Heading>
                <Text color="gray.700">
                    Orders can be modified or canceled within 24 hours of placing them. Please contact support for assistance.
                </Text>
            </Box>
        </Container>
    );
};

export default FAQ;