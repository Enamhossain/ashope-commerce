import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  User,
  Gift,
  Star,
} from "lucide-react";
import {
  Box,
  useColorModeValue,
  Flex,
  Text,
  Collapse,
  VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

function Sidebar({ user, onClose, ...rest }) {
  const adminMenuSections = [
    {
      title: "Main",
      items: [{ name: "Dashboard", icon: Home, path: "/dashboard" }],
    },

     {
      title:"User Interface",
      items: [
        {
          name: "Banners",
          icon: Gift,
          subMenu: [
            { name: "Add Banner", path: "ui/banners/add" },
            { name: "Banner List", path: "ui/banners/details" },
          ],
     }]},
    {
      title: "Management",
      items: [
        {
          name: "Products",
          icon: ShoppingBag,
          path: "",
          subMenu: [
            { name: "Add Product", path: "products/add" },
            { name: "Product List", path: "products/details" },
            { name: "Categories", path: "products/categories" },
          ],
        },
        {
          name: "Orders",
          icon: ClipboardList,
          path: "",
          subMenu: [
            { name: "All Orders", path: "orders/all" },
            { name: "Order Detail", path: "orders/details" },
            { name: "Completed Orders", path: "orders/completed" },
          ],
        },
        {
          name: "Users",
          icon: User,
          path: "",
          subMenu: [
            { name: "User List", path: "Users/Userlist" },
            { name: "Order Detail", path: "users/details" },
            { name: "Completed Orders", path: "users/completed" },
          ],
        },
        {
          name: "Customers",
          icon: Users,
          path: "/customers",
          subMenu: [
            { name: "All Customers", path: "/customers/all" },
            { name: "VIP Customers", path: "/customers/vip" },
          ],
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          name: "Analytics",
          icon: BarChart3,
          path: "/analytics",
          subMenu: [
            { name: "Sales Overview", path: "/analytics/sales" },
            { name: "Customer Insights", path: "/analytics/customers" },
            { name: "Performance Metrics", path: "/analytics/performance" },
          ],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          name: "Settings",
          icon: Settings,
          path: "/settings",
          subMenu: [
            { name: "Profile Settings", path: "/settings/profile" },
            { name: "Security", path: "/settings/security" },
            { name: "Notifications", path: "/settings/notifications" },
          ],
        },
      ],
    },
  ];

  // Moderator Menu
  const moderatorMenuSections = [
    {
      title: "Main",
      items: [{ name: "Dashboard", icon: Home, path: "/dashboard" }],
    },
    {
      title: "Management",
      items: [
        {
          name: "Products",
          icon: ShoppingBag,
          path: "",
          subMenu: [
            { name: "Add Product", path: "products/add" },
            { name: "Product List", path: "products/details" },
            { name: "Categories", path: "products/categories" },
          ],
        },
        {
          title:"User Interface",
          items: [
            {
              name: "Banners",
              icon: Gift,
              subMenu: [
                { name: "Add Banner", path: "ui/banners/add" },
                { name: "Banner List", path: "ui/banners/details" },
              ],
         }]},
     
      ],


    },
    
  ];


  const menuSections =
  user.role === "admin"
    ? adminMenuSections
    : user.role === "moderator"
    ? moderatorMenuSections
    : null; 

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      w={{ base: "full", md: 60 }}
      h="full"
      pos="fixed"
      {...rest}
    >
      <Box p={6}>
        <Flex align="center" gap={2} mb={8}>
          <Box
            w={8}
            h={8}
            bg="blue.600"
            rounded="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="white" fontWeight="bold">
              S
            </Text>
          </Box>
          <Link to="/" fontSize="xl" fontWeight="bold">
            quadpark
          </Link>
        </Flex>

        <nav>
          {menuSections.map((section, sectionIndex) => (
            <Box key={section.title} mb={6}>
              {/* Section Title */}
              <Text fontSize="xs" color="gray.400" fontWeight="semibold" mb={3}>
                {section.title}
              </Text>
              {section.items.map((item, index) => (
                <Box key={item.name} mb={4}>
                  <Flex
                    align="center"
                    gap={3}
                    p={2}
                    rounded="lg"
                    fontSize="sm"
                    cursor={item.subMenu ? "pointer" : "default"}
                    _hover={{
                      bg: item.subMenu ? "gray.50" : "blue.50",
                      color: item.subMenu ? "gray.600" : "blue.600",
                    }}
                    onClick={() =>
                     item.subMenu && toggleMenu(`${sectionIndex}-${index}`)
                    }
                    aria-expanded={
                      openMenus[`${sectionIndex}-${index}`] ? "true" : "false"
                    }
                  >
                    <item.icon size={18} />
                    <Link to={item.path}>{item.name}</Link>
                    {item.subMenu && (
                      <motion.div
                        animate={{
                          rotate: openMenus[`${sectionIndex}-${index}`]
                            ? 90
                            : 0,
                        }}
                        className="ml-auto transform"
                      >
                        <ChevronRightIcon />
                      </motion.div>
                    )}
                  </Flex>

                  {/* Submenu Items */}
                  {item.subMenu  && (
                    <Collapse
                      in={openMenus[`${sectionIndex}-${index}`]}
                      unmountOnExit
                    >
                      <VStack pl={6} mt={2} spacing={1} align="stretch">
                        {item.subMenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            style={{
                              display: "block",
                              padding: "8px 12px",
                              fontSize: "14px",
                              color: "#4A5568",
                              borderRadius: "4px",
                              textDecoration: "none",
                            }}
                            className="hover:bg-blue-50 hover:text-blue-600"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </VStack>
                    </Collapse>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </nav>
      </Box>
    </Box>
  );
}

export default Sidebar;
