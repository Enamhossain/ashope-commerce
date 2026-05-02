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
      title: "User Interface",
      items: [
        {
          name: "Banners",
          icon: Gift,
          subMenu: [
            { name: "Add Banner", path: "ui/banners/add" },
            { name: "Banner List", path: "ui/banners/details" },
          ],
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          name: "Products",
          icon: ShoppingBag,
          subMenu: [
            { name: "Add Product", path: "products/add" },
            { name: "Product List", path: "products/details" },
            { name: "Categories", path: "products/categories" },
          ],
        },
        {
          name: "Orders",
          icon: ClipboardList,
          subMenu: [
            { name: "All Orders", path: "orders/all" },
            { name: "Order Detail", path: "orders/details" },
            { name: "Tracking", path: "orders/tracking" },
          ],
        },
        {
          name: "Users",
          icon: Users,
          subMenu: [
            { name: "User List", path: "Users/Userlist" },
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
          subMenu: [
            { name: "Profile", path: "settings/profile" },
            { name: "Security", path: "settings/security" },
          ],
        },
      ],
    },
  ];

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
          subMenu: [
            { name: "Add Product", path: "products/add" },
            { name: "Product List", path: "products/details" },
          ],
        },
      ],
    },
  ];

  const menuSections = user?.role === "admin" ? adminMenuSections : moderatorMenuSections;
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <Box
      className="glass border-r border-white/5 h-full w-full md:w-64"
      pos="fixed"
      {...rest}
    >
      <Box p={6} className="h-full flex flex-col">
        <Flex align="center" gap={3} mb={10} px={2}>
          <Box
            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <Text color="white" fontWeight="900" fontSize="xl">S</Text>
          </Box>
          <div>
            <Text className="text-white font-bold text-xl leading-none">Squadpark</Text>
            <Text className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">Admin Panel</Text>
          </div>
        </Flex>

        <Box className="flex-1 overflow-y-auto custom-scrollbar px-2">
          {menuSections.map((section, sectionIdx) => (
            <Box key={section.title} mb={8}>
              <Text className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4 ml-2">
                {section.title}
              </Text>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const menuKey = `${sectionIdx}-${itemIdx}`;
                  const isOpen = openMenus[menuKey];
                  
                  return (
                    <Box key={item.name}>
                      {item.subMenu ? (
                        <button
                          onClick={() => toggleMenu(menuKey)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                            isOpen ? "bg-white/5 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon size={20} className={isOpen ? "text-primary" : "group-hover:text-primary transition-colors"} />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRightIcon />
                          </motion.div>
                        </button>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all group"
                        >
                          <item.icon size={20} className="group-hover:text-primary transition-colors" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                      )}

                      <Collapse in={isOpen} animateOpacity>
                        <div className="mt-1 ml-4 space-y-1 border-l border-white/5 pl-4 py-1">
                          {item.subMenu?.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              onClick={onClose}
                              className="block p-2 text-sm text-gray-500 hover:text-primary hover:translate-x-1 transition-all duration-200"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </Collapse>
                    </Box>
                  );
                })}
              </div>
            </Box>
          ))}
        </Box>

        <Box className="mt-auto pt-6 border-t border-white/5 px-2">
           <div className="glass !bg-white/5 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/20">
                <img src={user?.photoURL} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-primary font-bold uppercase">{user?.role}</p>
              </div>
           </div>
        </Box>
      </Box>
    </Box>
  );
}


export default Sidebar;
