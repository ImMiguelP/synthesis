import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

const NavMenu = () => {
  return (
    <Menu>
      <MenuButton variant="ghost" as={Button} rightIcon={<ChevronDownIcon />}>
        Games
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} href="/synthesis-memory">
          Synthesis Memory
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
