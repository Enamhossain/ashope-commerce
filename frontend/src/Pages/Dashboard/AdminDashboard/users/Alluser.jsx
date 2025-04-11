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
} from "@chakra-ui/react";
import { SearchIcon, EditIcon, DeleteIcon, ViewIcon, LockIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useAuthStore } from "../../../../store/authStore";

const Alluser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const usersPerPage = 10;
  const { users, setUsers, loading, error, fetchUsers, updateUserRole, deleteUser } = useAuthStore();
  const toast = useToast(); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const updatedUser = await updateUserRole(userId, newRole);
      if (updatedUser) {
        console.log("User role updated:", updatedUser);
      } else {
        console.warn("User role update failed");
      }
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      toast({
        title: "User deleted.",
        description: "The user has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast({
        title: "Error deleting user.",
        description: "There was an issue deleting the user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePrevious = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => (p < totalPages ? p + 1 : p));

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box p={5}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h2" size="lg" fontWeight="semibold">
          User Management
        </Heading>
        <InputGroup maxWidth="300px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input 
            placeholder="Search users..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </InputGroup>
      </Flex>

      <Box borderRadius="lg" borderWidth="1px" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Joined Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedUsers.map((user) => (
              <Tr key={user._id} transition="background 0.2s">
                <Td fontWeight="medium">{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <Select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      size="sm"
                      variant="outline"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </Select>
                  )}
                </Td>
                <Td>
                  <Badge
                    colorScheme={user.status === "Active" ? "green" : "red"}
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    {user.status}
                  </Badge>
                </Td>
                <Td>{user.joined}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      aria-label="View user"
                      icon={<Icon as={ViewIcon} />}
                      size="sm"
                      variant="ghost"
                    />
                    <IconButton
                      aria-label="Edit user"
                      icon={<Icon as={EditIcon} />}
                      size="sm"
                      variant="ghost"
                    />
                    <IconButton
                      aria-label="Reset password"
                      icon={<Icon as={LockIcon} />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                    />
                    <IconButton
                      aria-label="Delete user"
                      icon={<Icon as={DeleteIcon} />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDeleteUser(user._id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Flex justify="flex-end" mt={4} gap={2}>
        <IconButton
          aria-label="Previous page"
          icon={<Icon as={ChevronLeftIcon} />}
          onClick={handlePrevious}
          isDisabled={currentPage === 1}
        />
        <Button variant="ghost" fontWeight="bold">
          Page {currentPage} of {totalPages}
        </Button>
        <IconButton
          aria-label="Next page"
          icon={<Icon as={ChevronRightIcon} />}
          onClick={handleNext}
          isDisabled={currentPage >= totalPages}
        />
      </Flex>
    </Box>
  );
};

export default Alluser;
