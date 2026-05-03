
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
        _hover={{ color: "primary" }}
        className="hidden md:block"
      >
        {user ? (
          <Avatar name={userName} src={userAvatar} size="sm" />
        ) : (
          <FaUser size={15} />
        )}
      </MenuButton>
      <MenuList className="glass !bg-black/95 border-white/10 rounded-2xl shadow-2xl p-2 !min-w-[200px]">
  {user ? (
    <>
      <MenuGroup title="Profile" className="!text-primary !text-[10px] !font-black !uppercase !tracking-widest !mb-2">
        <Flex align="center" p={3} gap={3}>
          <Avatar name={userName} src={userAvatar} size="sm" border="2px solid" borderColor="primary" />
          <Text fontWeight="bold" color="white">{userName}</Text>
        </Flex>
      </MenuGroup>
      <MenuDivider className="!border-white/10" />
      <MenuItem className="!bg-transparent hover:!bg-white/5 !rounded-xl !text-gray-300 hover:!text-white transition-all">
        <Link to="/profile" className="w-full">My Profile</Link>
      </MenuItem>

      {/* Only Show Dashboard for Admins */}
      {user.role === "admin" && (
        <MenuItem className="!bg-transparent hover:!bg-white/5 !rounded-xl !text-gray-300 hover:!text-white transition-all">
          <Link to="/dashboard" className="w-full">Dashboard</Link>
        </MenuItem>
      )}
      <MenuItem className="!bg-transparent hover:!bg-white/5 !rounded-xl !text-gray-300 hover:!text-white transition-all">
        <Link to="/order" className="w-full">My Order</Link>
      </MenuItem>
      <MenuItem className="!bg-transparent hover:!bg-white/5 !rounded-xl !text-gray-300 hover:!text-white transition-all">
        <Link to="/settings" className="w-full">Settings</Link>
      </MenuItem>
      <MenuDivider className="!border-white/10" />
      <MenuItem onClick={handleLogout} className="!bg-transparent hover:!bg-primary/20 !rounded-xl !text-primary !font-bold transition-all">
        Logout
      </MenuItem>
    </>
  ) : (
    <>
      <MenuGroup title="Authentication" className="!text-primary !text-[10px] !font-black !uppercase !tracking-widest !mb-2">
        <MenuItem className="!bg-transparent hover:!bg-white/5 !rounded-xl !text-gray-300 hover:!text-white transition-all">
          <Link to="/signin" className="w-full">
            <Flex align="center" gap={3}>
              <FaSignInAlt className="text-primary" />
              <Text fontSize="sm">Login</Text>
            </Flex>
          </Link>
        </MenuItem>
        <MenuItem className="!bg-transparent hover:!bg-white/5 !rounded-xl !text-gray-300 hover:!text-white transition-all">
          <Link to="/signup" className="w-full">
            <Flex align="center" gap={3}>
              <FaUserPlus className="text-primary" />
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



