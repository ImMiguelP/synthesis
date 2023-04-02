import { Heading, Button, useColorMode } from "@chakra-ui/react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Heading>Hello Synthesis!</Heading>
    </>
  );
}
