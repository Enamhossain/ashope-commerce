import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Search,
  Moon,
  Bell,
  MessageSquare,
  Maximize2,
  LayoutGrid,
  Menu,
} from "lucide-react";
import Sidebar from "../Component/Sidebar/Sidebar";
import { Drawer, DrawerContent, DrawerOverlay,  useDisclosure, IconButton, useColorModeValue } from "@chakra-ui/react";
import { useAuthStore } from "../store/authStore";

function AdminLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const {user } = useAuthStore();

  return (
    <div className="flex h-screen" bg={bgColor}>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar user={user} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <div className="flex-1 flex flex-col">
      
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
       
          <IconButton
            aria-label="Open Menu"
            icon={<Menu size={24} />}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={onOpen} 
          />

       
          <div className="flex items-center flex-1">
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

        
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Moon size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <MessageSquare size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Maximize2 size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <LayoutGrid size={20} className="text-gray-600" />
            </button>

            <div className="flex items-center gap-3 ml-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">{user.name || user.displayName}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-700">
            <Outlet />
          </h1>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
