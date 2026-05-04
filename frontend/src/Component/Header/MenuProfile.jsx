
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Avatar,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FaSignInAlt, FaUser, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";



const MenuProfile = ({handleLogout}) => {

  const { user } = useAuthStore();
  const userName = user?.name || user?.displayName ;
  const userAvatar = user?.profilePic || user?.photoURL;

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="ghost"
        _hover={{ color: "var(--primary)" }}
        className="hidden md:block"
      >
        {user ? (
          <Avatar name={userName} src={userAvatar} size="sm" />
        ) : (
          <FaUser size={15} />
        )}
      </MenuButton>
      <MenuList bg="blackAlpha.900" borderColor="whiteAlpha.300" borderRadius="2xl" boxShadow="2xl" p={2} minW="200px">
  {user ? (
    <>
      <MenuGroup title="Profile" color="primary" fontSize="10px" fontWeight="black" textTransform="uppercase" letterSpacing="widest" mb={2}>
        <Flex align="center" p={3} gap={3}>
          <Avatar name={userName} src={userAvatar} size="sm" border="2px solid" borderColor="var(--primary)" />
          <Text fontWeight="bold" color="white">{userName}</Text>
        </Flex>
      </MenuGroup>
      <MenuDivider borderColor="whiteAlpha.300" />
      <MenuItem bg="transparent" _hover={{ bg: "whiteAlpha.200", color: "white" }} borderRadius="xl" color="gray.300" transition="all 0.2s">
        <Link to="/profile" style={{ width: '100%' }}>My Profile</Link>
      </MenuItem>

      {/* Only Show Dashboard for Admins */}
      {user.role === "admin" && (
        <MenuItem bg="transparent" _hover={{ bg: "whiteAlpha.200", color: "white" }} borderRadius="xl" color="gray.300" transition="all 0.2s">
          <Link to="/dashboard" style={{ width: '100%' }}>Dashboard</Link>
        </MenuItem>
      )}
      <MenuItem bg="transparent" _hover={{ bg: "whiteAlpha.200", color: "white" }} borderRadius="xl" color="gray.300" transition="all 0.2s">
        <Link to="/order" style={{ width: '100%' }}>My Order</Link>
      </MenuItem>
      <MenuItem bg="transparent" _hover={{ bg: "whiteAlpha.200", color: "white" }} borderRadius="xl" color="gray.300" transition="all 0.2s">
        <Link to="/settings" style={{ width: '100%' }}>Settings</Link>
      </MenuItem>
      <MenuDivider borderColor="whiteAlpha.300" />
      <MenuItem onClick={handleLogout} bg="transparent" _hover={{ bg: "primaryAlpha.200" }} borderRadius="xl" color="primary" fontWeight="bold" transition="all 0.2s">
        Logout
      </MenuItem>
    </>
  ) : (
    <>
      <MenuGroup title="Authentication" color="primary" fontSize="10px" fontWeight="black" textTransform="uppercase" letterSpacing="widest" mb={2}>
        <MenuItem bg="transparent" _hover={{ bg: "whiteAlpha.200", color: "white" }} borderRadius="xl" color="gray.300" transition="all 0.2s">
          <Link to="/signin" style={{ width: '100%' }}>
            <Flex align="center" gap={3}>
              <FaSignInAlt color="var(--chakra-colors-primary)" />
              <Text fontSize="sm">Login</Text>
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem bg="transparent" _hover={{ bg: "whiteAlpha.200", color: "white" }} borderRadius="xl" color="gray.300" transition="all 0.2s">
          <Link to="/signup" style={{ width: '100%' }}>
            <Flex align="center" gap={3}>
              <FaUserPlus color="var(--chakra-colors-primary)" />
              <Text fontSize="sm">Sign Up</Text>
            </Flex>
          </Link>
        </MenuItem>
      </MenuGroup>
    </>
  )}
</MenuList>

    </Menu>
  );
};

export default MenuProfile;



