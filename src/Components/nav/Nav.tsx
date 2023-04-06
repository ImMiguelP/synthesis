import React from "react";
import {
  Flex,
  HStack,
  Image,
  useColorMode,
  useColorModeValue,
  Text,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { Moon, Sun1 } from "iconsax-react";
import NavMenu from "./NavMenu";

const Nav = () => {
  const { toggleColorMode } = useColorMode();
  const logoSrc = useColorModeValue("/synLogoBlack.png", "/synLogo.png");
  const buttonIcon = useColorModeValue(
    <Moon size="24" variant="Bold" />,
    <Sun1 size="24" variant="Bold" />
  );

  return (
    <Flex w="100%" as="header" py={5} justify="space-between" px={0} zIndex={1}>
      <HStack h="39px" zIndex={1}>
        <Link href="/">
          <HStack>
            <Image src={logoSrc} alt="logo" h="39px" />
            <Text>Synthesis</Text>
          </HStack>
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
