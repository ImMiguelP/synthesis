import React from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  useColorMode,
  useColorModeValue,
  Text,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Moon, Sun1 } from "iconsax-react";
import NavMenu from "./NavMenu";

const Nav = () => {
  const { toggleColorMode } = useColorMode();
  const logoSrc = useColorModeValue("/synLogoBlack.png", "/synLogo.png");
  const buttonIcon = useColorModeValue(
    <Moon size="32" variant="Bold" />,
    <Sun1 size="32" variant="Bold" />
  );

  return (
    <Flex w="100%" as="header" py={5} justify="space-between" px={0} zIndex={1}>
      <HStack h="39px" zIndex={1}>
        <Link href="/">
          <Image src={logoSrc} alt="logo" h="39px" />
        </Link>
      </HStack>
      <HStack>
        <NavMenu />
        <IconButton
          aria-label="Search database"
          variant="ghost"
          _hover={{ bg: "transparent" }}
          onClick={toggleColorMode}
          icon={buttonIcon}
        />
      </HStack>
    </Flex>
  );
};

export default Nav;
