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
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#fff',
        bodyColor: '#94a3b8',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#64748b', font: { size: 10 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { size: 10 } }
      }
    }
  };

  return (
    <Box>
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Platform Overview</h2>
        <p className="text-gray-400">Welcome back, admin. Here's what's happening today.</p>
      </header>

      {/* Stats Overview */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={10}>
        {stats.map((stat, index) => (
          <div key={index} className="premium-card p-6 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-colors">
                <Icon as={stat.icon} className="text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">+12.5%</span>
            </div>
            <p className="text-sm font-medium text-gray-400 mb-1">{stat.title}</p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Monthly Revenue */}
        <div className="premium-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">Revenue Performance</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg text-xs px-3 py-1.5 outline-none focus:ring-1 focus:ring-primary">
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <Line 
              data={salesData} 
              options={{
                ...chartOptions,
                elements: {
                  line: { borderColor: '#ff4d00', borderWidth: 3, fill: true, backgroundColor: 'rgba(255, 77, 0, 0.1)' },
                  point: { radius: 0, hoverRadius: 6, backgroundColor: '#ff4d00' }
                }
              }} 
            />
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="premium-card p-8">
          <h3 className="text-lg font-bold text-white mb-8">Top Selling Products</h3>
          <div className="h-[300px]">
             <Bar 
              data={barData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: { display: true, position: 'top', labels: { color: '#94a3b8', font: { size: 10 }, usePointStyle: true } }
                }
              }} 
            />
          </div>
        </div>
      </SimpleGrid>

      {/* Recent Activity Table (Placeholder for future functionality) */}
      <div className="premium-card mt-8 p-8 overflow-hidden">
        <h3 className="text-lg font-bold text-white mb-6">Recent Inventory Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Product</th>
                <th className="pb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Category</th>
                <th className="pb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Stock</th>
                <th className="pb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Price</th>
                <th className="pb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topProducts.map((product, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="py-4 font-medium text-sm text-gray-300">{product.name}</td>
                  <td className="py-4 text-sm text-gray-500">Clothing</td>
                  <td className="py-4 text-sm text-gray-300">{product.sales} units</td>
                  <td className="py-4 text-sm text-white font-bold">${product.revenue / product.sales}</td>
                  <td className="py-4">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">In Stock</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Box>
  );
};


export default DashboardOverview;
