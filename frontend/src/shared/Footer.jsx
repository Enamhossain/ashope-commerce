import { Box, Flex, Heading, Text, Stack, Link, Input, Button, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const Footer = () => {
  return (
    <Box bg="black" borderTop="1px solid" borderTopColor="whiteAlpha.100" color="gray.300" py={12} px={6} fontFamily="Inter, sans-serif">
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="flex-start" maxW="1200px" mx="auto">
        
        {/* Brand Description */}
        <MotionBox mb={8} flex={1} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Heading size="md" mb={4} fontWeight="black" color="white" letterSpacing="-0.03em">
              Ashop
          </Heading>
          <Text fontSize="sm" mb={4} color="whiteAlpha.600">
            Your go-to store for all your shopping needs. High quality, <br /> fast delivery, and customer satisfaction are our top priorities.
          </Text>
          <Text fontSize="sm" color="whiteAlpha.400">© 2024 Ashop. All rights reserved.</Text>
        </MotionBox>

        {/* Quick Links */}
        <MotionBox mb={8} flex={1} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <Heading size="sm" mb={4} color="white" textTransform="uppercase">Quick Links</Heading>
          <Stack spacing={3}>
            {["About Us", "Products", "Contact Us", "FAQ", "Terms & Conditions"].map((item, idx) => (
              <Link key={idx} href={`/${item.toLowerCase().replace(/ /g, "-")}`} _hover={{ color: "orange.500", transition: "0.3s" }}>
                {item}
              </Link>
            ))}
          </Stack>
        </MotionBox>

        {/* Customer Support */}
        <MotionBox mb={8} flex={1} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <Heading size="sm" mb={4} color="white" textTransform="uppercase">Customer Support</Heading>
          <Stack spacing={3}>
            {["Return Policy", "Shipping Information", "Help Center"].map((item, idx) => (
              <Link key={idx} href={`/${item.toLowerCase().replace(/ /g, "-")}`} color="white" _hover={{ color: "primary", transition: "0.3s" }}>
                {item}
              </Link>
            ))}
          </Stack>
        </MotionBox>

        {/* Newsletter Subscription */}
        <MotionBox mb={8} flex={1} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
          <Heading size="sm" mb={4} color="white" textTransform="uppercase">Subscribe to our Newsletter</Heading>
          <Text fontSize="sm" mb={3} color="gray.400">Stay updated with the latest deals and offers!</Text>
          <Flex>
            <Input placeholder="Your Email" bg="gray.800" borderColor="gray.700" _placeholder={{ color: "gray.300" }} focusBorderColor="yellow.400" mr={2} color="white" px={4} py={3} borderRadius="md" />
            <Button 
              bg="primary" 
              _hover={{ bg: "orange.600", shadow: "0px 0px 20px rgba(255, 77, 0, 0.4)" }} 
              color="white" 
              px={8} py={3} 
              borderRadius="xl" 
              transition="all 0.3s"
              fontWeight="bold"
            >
              Subscribe
            </Button>
          </Flex>
        </MotionBox>

      </Flex>

      <Divider my={2} borderColor="gray.600" />

      {/* Developer Credit */}
      <Flex justify="center">
        <MotionText fontSize="sm" color="white/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          Developed by -{" "}
          <Link 
            href="https://webenamhossain.vercel.app/" 
            color="white" 
            fontWeight="bold" 
            isExternal 
            _hover={{ textDecoration: "none", color: "primary", transition: "0.3s" }}
          >
            Enam Hossain
          </Link>
        </MotionText>
      </Flex>

      <Divider my={4} borderColor="gray.600" />
    </Box>
  );
};

export default Footer;
