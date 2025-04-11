
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
        _hover={{ color: "red.400" }}
        className="hidden md:block"
      >
        {user ? (
          <Avatar name={userName} src={userAvatar} size="sm" />
        ) : (
          <FaUser size={15} />
        )}
      </MenuButton>
      <MenuList textColor="black">
  {user ? (
    <>
      <MenuGroup title="Profile">
        <Flex align="center" p={3} gap={3}>
          <Avatar name={userName} src={userAvatar} size="sm" />
          <Text fontWeight="bold">{userName}</Text>
        </Flex>
      </MenuGroup>
      <MenuDivider />
      <MenuItem>
        <Link to="/profile">My Profile</Link>
      </MenuItem>

      {/* Only Show Dashboard for Admins */}
      {user.role === "admin" && (
        <MenuItem>
          <Link to="/dashboard">Dashboard</Link>
        </MenuItem>
      )}
  <MenuItem>
        <Link to="/order">My Order</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/settings">Settings</Link>
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={handleLogout} color="red.500">
        Logout
      </MenuItem>
    </>
  ) : (
    <>
      <MenuGroup title="Authentication">
        <MenuItem>
          <Link to="/signin">
            <Flex align="center" gap={2}>
              <FaSignInAlt />
              <Text>Login</Text>
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/signup">
            <Flex align="center" gap={2}>
              <FaUserPlus />
              <Text>Sign Up</Text>
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



