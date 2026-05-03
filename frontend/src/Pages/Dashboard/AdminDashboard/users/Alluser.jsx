import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  IconButton,
  Button,
  Select,
  useToast,
  Icon,
  Text,
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, DeleteIcon, ViewIcon, LockIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useAuthStore } from "../../../../store/authStore";

import { Search, Eye, UserCog, ShieldAlert, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const Alluser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const usersPerPage = 10;
  const { users, loading, error, fetchUsers, updateUserRole, deleteUser } = useAuthStore();
  const toast = useToast(); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      toast({ title: "Role Updated", status: "success", duration: 3000, position: "top-right" });
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      toast({ title: "User Deleted", status: "success", duration: 3000, position: "top-right" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete user", status: "error", position: "top-right" });
    }
  };

  const filteredUsers = users.filter(user =>
    user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePrevious = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => (p < totalPages ? p + 1 : p));

  if (loading) return <Flex justify="center" py={20}><Spinner size="xl" color="primary" /></Flex>;
  if (error) return <Box p={10} textAlign="center" color="red.400">Error: {error}</Box>;

  return (
    <div className="premium-card overflow-hidden">
      <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h2 className="text-xl font-bold text-white mb-1">User Management</h2>
           <p className="text-xs text-gray-400">Control user roles and platform access</p>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm w-full md:w-80 text-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table variant="unstyled">
          <Thead className="bg-white/5">
            <Tr>
              {["User", "Role", "Joined Date", "Actions"].map((header) => (
                <Th key={header} className="!text-[10px] !font-bold !text-gray-500 !uppercase !tracking-widest !py-5 !px-8">
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody className="divide-y divide-white/5">
            {paginatedUsers.map((user) => (
              <Tr key={user._id} className="group hover:bg-white/5 transition-colors">
                <Td className="!py-5 !px-8">
                  <Flex align="center" gap={3}>
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                       {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <Text className="text-sm font-bold text-white leading-tight mb-1">{user.name}</Text>
                      <Text className="text-xs text-gray-500">{user.email}</Text>
                    </div>
                  </Flex>
                </Td>
                <Td className="!py-5 !px-8">
                  {user.role === "admin" ? (
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase border border-primary/20">
                      Administrator
                    </span>
                  ) : (
                    <Select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      size="sm"
                      className="!bg-white/5 !border-white/10 !rounded-lg !text-xs !text-gray-300"
                    >
                      <option value="user">Standard User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Administrator</option>
                    </Select>
                  )}
                </Td>
                <Td className="!py-5 !px-8 text-sm text-gray-500">
                  {new Date(user.joined).toLocaleDateString()}
                </Td>
                <Td className="!py-5 !px-8">
                  <Flex gap={2}>
                    <button className="p-2 glass !bg-white/5 text-gray-400 hover:!text-white rounded-lg transition-all">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 glass !bg-white/5 text-gray-400 hover:!text-primary rounded-lg transition-all">
                      <UserCog size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 glass !bg-white/5 text-gray-400 hover:!text-primary rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <div className="p-6 border-t border-white/5 flex items-center justify-between">
         <Text className="text-xs text-gray-500">
           Page {currentPage} of {totalPages}
         </Text>
         <div className="flex items-center gap-2">
            <button 
              onClick={handlePrevious} 
              disabled={currentPage === 1}
              className="p-2 glass !bg-white/5 text-gray-400 rounded-lg hover:!bg-white/10 transition-all disabled:opacity-30"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNext} 
              disabled={currentPage >= totalPages}
              className="p-2 glass !bg-white/5 text-gray-400 rounded-lg hover:!bg-white/10 transition-all disabled:opacity-30"
            >
              <ChevronRight size={18} />
            </button>
         </div>
      </div>
    </div>
  );
};


export default Alluser;
