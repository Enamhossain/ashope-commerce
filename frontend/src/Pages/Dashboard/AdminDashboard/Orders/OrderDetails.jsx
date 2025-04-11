import React from 'react';
import { Box, Container, Flex, Text, Select, GridItem, Grid } from '@chakra-ui/react';
import OrderItem from '../../../../Component/OrdersCard/OrderItem';
import CartTotals from '../../../../Component/OrdersCard/CartTotals';
import OrderSummary from '../../../../Component/OrdersCard/OrderSummary';
import ShippingInfo from '../../../../Component/OrdersCard/ShippingInfo';

const orderItems = [
  {
    id: 0,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=100&q=80',
    name: 'Kristin Watson',
    quantity: 12,
    price: 50.47,
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=100&q=80',
    name: 'Kristin Watson',
    quantity: 1,
    price: 50.47,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=100&q=80',
    name: 'Kristin Watson',
    quantity: 1,
    price: 50.47,
  },
];

function OrderDetails() {
  return (
    <Box py={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text fontSize="lg" fontWeight="medium">All items</Text>
        <Select w="auto" placeholder="Sort" size="sm" aria-label="Sort options">
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Latest</option>
        </Select>
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", sm: "2fr", lg: "repeat(4, 1fr)" }}
        gap={6} 
      >
        {/* Left Section */}
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <Box bg="white" p={6} borderRadius="lg" shadow="sm" mb={6}>
            {orderItems.map((item) => (
              <OrderItem key={item.id} {...item} />
            ))}
          </Box>

          <CartTotals
            subtotal={70.13}
            shipping={10.00}
            tax={5.00}
            total={90.58}
          />
        </GridItem>

        {/* Right Section */}
        <GridItem colSpan={{ base: 1, lg: 2 }}>
          <OrderSummary
            orderId="192847"
            date="20 Nov 2023"
            total={948.50}
          />

          <Box mt={6}>
            <ShippingInfo
              address="3517 W. Gray St. Utica, Pennsylvania 57867"
              paymentMethod="Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability."
              expectedDate="20 Nov 2023"
            />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default OrderDetails;
