import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    black: "#000000",
    white: "#FFFFFF",
  },
  styles: {
    global: ({ colorMode }: { colorMode: "light" | "dark" }) => ({
      body: {
        bg: colorMode === "dark" ? "black" : "white",
        color: colorMode === "dark" ? "white" : "black",
      },
    }),
  },
});

export default theme;
