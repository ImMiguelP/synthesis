import { Heading, Stack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Stack textAlign="center">
      <Heading>Hello Synthesis!</Heading>
      <Stack align="center" spacing={10} pt={10}>
        <Text>Check out our new memory game below</Text>
        <Link href="/synthesis-memory">
          <Image
            src="/images/synMemory/synMemory.gif"
            alt="Synthesis Logo"
            objectFit="contain"
          />
        </Link>
      </Stack>
    </Stack>
  );
}
