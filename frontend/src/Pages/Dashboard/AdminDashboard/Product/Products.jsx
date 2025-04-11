import React from 'react';
import { Box, Heading, VStack, Flex, Button } from '@chakra-ui/react';
import { Outlet, Link } from 'react-router-dom';

function Products() {
  return (
   
      <VStack
        align="stretch"
        spacing={4}
        mt={0}
        bg="white"
        shadow="sm"
        rounded="md"
        textAlign={'center'}
        className="border border-gray-200"
      >
        <Outlet />
      </VStack>
   
  );
}

export default Products;
