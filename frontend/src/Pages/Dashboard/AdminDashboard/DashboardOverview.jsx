import React from 'react';
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Icon, Card, CardHeader, CardBody, VStack, Heading, Text } from '@chakra-ui/react';
import { FaTshirt, FaMoneyBillWave, FaShoppingCart, FaUsers } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Sales Chart Data
const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue ($)',
      data: [12000, 15000, 17000, 14000, 19000, 22000],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4,
    },
  ],
};

// Top Products Data
const topProducts = [
  { name: "Summer Dress", sales: 245, revenue: 12250, trend: "up" },
  { name: "Denim Jeans", sales: 190, revenue: 9500, trend: "up" },
  { name: "Basic T-Shirt", sales: 175, revenue: 4375, trend: "down" },
  { name: "Leather Jacket", sales: 120, revenue: 18000, trend: "up" }
];

// Bar Chart Data for Top Products
const barData = {
  labels: topProducts.map((product) => product.name),
  datasets: [
    {
      label: "Sales",
      data: topProducts.map((product) => product.sales),
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Revenue ($)",
      data: topProducts.map((product) => product.revenue),
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    }
  ]
};

// Bar Chart Options
const barChartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    tooltip: { enabled: true }
  },
  scales: {
    y: { beginAtZero: true }
  }
};

// Stats Data
const stats = [
  { title: 'Total Sales', value: '12,345', icon: FaShoppingCart },
  { title: 'Total Revenue', value: '$87,654', icon: FaMoneyBillWave },
  { title: 'Orders Processed', value: '8,450', icon: FaTshirt },
  { title: 'Total Customers', value: '5,678', icon: FaUsers },
];

// Stats Component
const StatsCard = ({ stat }) => (
  <Card p={4} boxShadow="md">
    <Stat>
      <StatLabel>{stat.title}</StatLabel>
      <StatNumber>{stat.value}</StatNumber>
      <StatHelpText>
        <Icon as={stat.icon} boxSize={6} color="teal.500" />
      </StatHelpText>
    </Stat>
  </Card>
);

// Dashboard Component
const DashboardOverview = () => {
  return (
    <Box p={6}>
      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} />
        ))}
      </SimpleGrid>

      {/* Top Selling Products Bar Chart */}
      <Box p={6} bg="white" rounded="lg" shadow="md" mt={6}>
        <Heading size="md" mb={4}>Top Selling Products</Heading>
        <Bar data={barData} options={barChartOptions} />
      </Box>

      {/* Monthly Revenue Line Chart */}
      <Card mt={6} p={4} boxShadow="md">
        <CardHeader>
          <Text fontSize="xl" fontWeight="bold">Monthly Revenue Overview</Text>
        </CardHeader>
        <CardBody>
          <Box height="300px">
            <Line data={salesData} />
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default DashboardOverview;
