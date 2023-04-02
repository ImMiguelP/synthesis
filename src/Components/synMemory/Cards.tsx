import { Box, Image, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

type Card = { src: string; id: number };

const Cards = ({
  card,
  handleCardClick,
  flipped,
  disabled,
}: {
  card: Card;
  handleCardClick: any;
  flipped: boolean;
  disabled: boolean;
}) => {
  const coverImage = useColorModeValue("/synLogoBlack.png", "/synLogo.png");
  const bgColor = useColorModeValue("white", "black");
  const border = useColorModeValue("black", "white");

  const handleCLick = () => {
    if (!disabled) {
      handleCardClick(card);
    }
  };

  return (
    <Stack>
      <Box
        pos="relative"
        rounded="sm"
        border={`2px ${border} solid`}
        boxSize="160px"
        onClick={handleCLick}
        transform={flipped ? "rotateY(180deg)" : ""}
        transition="transform ease-in 0.2s"
      >
        <Image
          pos="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          boxSize="100%"
          src={coverImage}
          alt="cover"
          objectFit="contain"
          zIndex="2"
          opacity={flipped ? "0" : "1"}
          transition="opacity ease-in 0.2s"
        />
        <Image
          pos="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          boxSize="100%"
          src={card.src}
          alt="front"
          objectFit="contain"
          zIndex="1"
          opacity={flipped ? "1" : "0"}
          transition="opacity ease-in 0.2s"
        />
      </Box>
    </Stack>
  );
};

export default Cards;