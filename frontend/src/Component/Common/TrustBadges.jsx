import React from 'react';
import { Box, SimpleGrid, Icon, Text, VStack } from '@chakra-ui/react';
import { ShieldCheck, Truck, RotateCcw, Headset } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadges = () => {
  const badges = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over $100',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      description: '100% secure payment',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day money back',
    },
    {
      icon: Headset,
      title: '24/7 Support',
      description: 'Dedicated support',
    },
  ];

  return (
    <Box py={16} bg="black" borderY="1px" borderColor="white/10">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} maxW="7xl" mx="auto" px={6}>
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <VStack spacing={4} align="center" className="group">
              <Box 
                p={4} 
                rounded="2xl" 
                bg="white/5" 
                color="primary"
                transition="all 0.3s"
                _groupHover={{ bg: 'primary', color: 'white', transform: 'scale(1.1)' }}
              >
                <Icon as={badge.icon} boxSize={8} />
              </Box>
              <VStack spacing={1}>
                <Text color="white" fontWeight="bold" fontSize="lg">
                  {badge.title}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  {badge.description}
                </Text>
              </VStack>
            </VStack>
          </motion.div>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TrustBadges;
