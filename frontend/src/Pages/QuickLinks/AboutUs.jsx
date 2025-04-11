import { Container, Box, Heading, Text, Input, Textarea, Button, FormControl, FormLabel } from '@chakra-ui/react';

import React from 'react';

const ContactUs = () => {
    return (
     <Container maxW="container.md" py={8}>
             {/* Contact Us Section */}
             <Box bg="white" shadow="md" rounded="lg" p={6} mt={8}>
                <Heading as="h2" size="lg" mb={4} textAlign="center">
                    Contact Us
                </Heading>
                <FormControl mb={4}>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" placeholder="Your Name" />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Your Email" />
                </FormControl>
                <FormControl mb={4}>
                    <FormLabel>Message</FormLabel>
                    <Textarea placeholder="Your Message" rows={4} />
                </FormControl>
                <Button colorScheme="blue" width="full">Submit</Button>
            </Box>

            {/* Address Section */}
            <Box bg="gray.50" shadow="md" rounded="lg" p={6} mt={6}>
                <Heading as="h2" size="md" mb={2}>Our Address</Heading>
                <Text color="gray.700">123 Business Street, Suite 100</Text>
                <Text color="gray.700">City, State, ZIP Code</Text>
                <Text color="gray.700">Phone: (123) 456-7890</Text>
                <Text color="gray.700">Email: support@company.com</Text>
            </Box>
        </Container>
    );
};

export default ContactUs;