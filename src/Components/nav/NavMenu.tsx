import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

const NavMenu = () => {
  const handleDownload = () => {
    window.location.href = "/game";
  };

  return (
    <Menu>
      <MenuButton variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
        Games
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleDownload}>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
