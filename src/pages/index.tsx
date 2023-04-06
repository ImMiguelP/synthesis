import { Heading, Stack, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Stack textAlign="center">
      <Heading>Hello Synthesis!</Heading>
      <Stack align="center">
        <Link href="/synthesis-memory">
          <Image
            boxSize="2xl"
            src="/images/synMemory/synMemory.gif"
            alt="Synthesis Logo"
            objectFit="contain"
          />
        </Link>
      </Stack>
    </Stack>
  );
}
