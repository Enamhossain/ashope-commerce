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
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background Mesh */}
      <div className="bg-mesh opacity-50"></div>

      {/* Sidebar for Mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(8px)" />
        <DrawerContent bg="transparent" boxShadow="none">
          <Sidebar user={user} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-full relative z-20">
         <Sidebar user={user} onClose={onClose} />
      </div>

      <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Header */}
        <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <IconButton
              aria-label="Open Menu"
              icon={<Menu size={24} />}
              className="md:hidden glass !bg-white/5 !text-white hover:!bg-white/10 border-none"
              onClick={onOpen}
            />
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-400">
              <LayoutGrid size={16} />
              <span>Admin Dashboard</span>
              <span className="mx-2 text-white/20">/</span>
              <span className="text-white font-medium capitalize">
                {window.location.pathname.split("/").pop() || "Overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="relative hidden xl:block w-72 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search analytics..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 glass !bg-white/5 !text-white hover:!bg-white/10 rounded-xl relative group transition-all">
                <Bell size={20} className="group-hover:scale-110 transition-transform" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-[#0f172a]"></span>
              </button>
              <button className="p-2.5 glass !bg-white/5 !text-white hover:!bg-white/10 rounded-xl group transition-all">
                <Settings size={20} className="group-hover:rotate-45 transition-transform" />
              </button>
            </div>

            <Box className="w-[1px] h-8 bg-white/10 mx-2" />

            <div className="flex items-center gap-4 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-none mb-1">{user?.name || user?.displayName}</p>
                <p className="text-[10px] uppercase tracking-wider font-bold text-primary">{user?.role}</p>
              </div>
              <div className="relative">
                 <img
                  src={user?.photoURL || "https://ui-avatars.com/api/?name=" + (user?.name || "Admin")}
                  alt="Profile"
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/10 hover:ring-primary/50 transition-all cursor-pointer"
                />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[#0f172a] rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
           <div className="max-w-[1600px] mx-auto">
              <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
}


export default AdminLayout;
