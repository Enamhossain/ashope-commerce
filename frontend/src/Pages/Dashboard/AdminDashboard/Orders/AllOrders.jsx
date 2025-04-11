import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  Button,
  IconButton,
  Flex,
  Input,
  Box,
  Heading,
  Text,
  HStack,
} from '@chakra-ui/react';
import { ViewIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

const AllOrders = () => {
  const orders = [
    {
      product: 'Dog Food, Chicken & Chicken Liver Recipe',
      orderId: '#7712309',
      price: '$1,452.50',
      quantity: 1638,
      payment: 20,
      status: 'Success',
      tracking: 'Tracking',
    },
    {
      product: 'Grain Free Dry Dog Food | Rachael Ray® Nutrish®',
      orderId: '#7712309',
      price: '$1,452.50',
      quantity: 1638,
      payment: 20,
      status: 'Pending',
      tracking: 'Tracking',
    },
    {
      product: 'Weruva Pumpkin Patch Up! Pumpkin With Ginger',
      orderId: '#7712309',
      price: '$1,452.50',
      quantity: 1638,
      payment: 20,
      status: 'Cancel',
      tracking: 'Tracking',
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Success':
        return <Badge colorScheme="green">{status}</Badge>;
      case 'Pending':
        return <Badge colorScheme="gray">{status}</Badge>;
      case 'Cancel':
        return <Badge colorScheme="red">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Box p={5} bg="gray.50" borderRadius="md" shadow="md">
      <Flex mb={5} justify="space-between" align="center">
        <Heading fontSize="2xl" color="gray.700">All Orders</Heading>
        <Button colorScheme="blue" fontSize="sm">Export all orders</Button>
      </Flex>
      <Flex mb={5} justify="space-between" align="center">
        <Input placeholder="Search here..." width="300px" bg="white" borderColor="gray.300" fontSize="sm" />
      </Flex>
      <TableContainer bg="white" borderRadius="md" shadow="sm">
        <Table variant="striped" colorScheme="gray">
          <Thead bg="gray.100">
            <Tr>
              <Th fontSize="sm">Product</Th>
              <Th fontSize="sm">Order ID</Th>
              <Th fontSize="sm">Price</Th>
              <Th fontSize="sm">Quantity</Th>
              <Th fontSize="sm">Payment</Th>
              <Th fontSize="sm">Status</Th>
              <Th fontSize="sm">Tracking</Th>
              <Th fontSize="sm">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, index) => (
              <Tr key={index}>
                <Td fontSize="sm">
                  <HStack>
                    <Box w="50px" h="50px" bg="gray.200" borderRadius="md"></Box>
                    <Text fontSize="sm">{order.product}</Text>
                  </HStack>
                </Td>
                <Td fontSize="sm">{order.orderId}</Td>
                <Td fontSize="sm">{order.price}</Td>
                <Td fontSize="sm">{order.quantity}</Td>
                <Td fontSize="sm">{order.payment}</Td>
                <Td fontSize="sm">{getStatusBadge(order.status)}</Td>
                <Td fontSize="sm">
                  <Button colorScheme="blue" size="sm">
                    {order.tracking}
                  </Button>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      aria-label="View"
                      icon={<ViewIcon />}
                      colorScheme="blue"
                      size="sm"
                    />
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      colorScheme="green"
                      size="sm"
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      colorScheme="red"
                      size="sm"
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllOrders;
