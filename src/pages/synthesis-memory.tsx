import Cards from "@/Components/synMemory/Cards";
import {
  Button,
  Divider,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type Card = {
  src: string;
  id: number;
  matched: boolean;
};

const synthesisMemory = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  const bgColor = useColorModeValue("black", "white");
  const cardImages = [
    { src: "/images/synMemory/cat.png", matched: false },
    { src: "/images/synMemory/dog.png", matched: false },
    { src: "/images/synMemory/frog.png", matched: false },
    { src: "/images/synMemory/ghost.png", matched: false },
    { src: "/images/synMemory/heart.png", matched: false },
    { src: "/images/synMemory/spaceship.png", matched: false },
  ];

  const newGame = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setFirstCard(null);
    setSecondCard(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleCardClick = (card: Card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.src === secondCard.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === firstCard.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCards();
      } else {
        setTimeout(() => {
          resetCards();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setTurns(turns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    newGame();
  }, []);

  return (
    <Stack w="100%" align="center" justify="center" spacing={5}>
      <Heading>Synthesis Memory Game</Heading>
      <Button onClick={newGame}>New Game</Button>
      <HStack w="50%" justify="space-between" mb={10}>
        <Text>Player 1: {playerOneScore}</Text>
        <Text> Turns: {turns} </Text>
        <Text>Player 2: {playerTwoScore}</Text>
      </HStack>
      <Divider bgColor={bgColor} h="1px" />
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {cards.map((card) => (
          <Cards
            key={card.id}
            card={card}
            handleCardClick={handleCardClick}
            flipped={card === firstCard || card === secondCard || card.matched}
            disabled={disabled}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default synthesisMemory;
