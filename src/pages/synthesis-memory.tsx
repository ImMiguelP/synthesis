import Cards from "@/Components/synMemory/Cards";
import {
  Button,
  Divider,
  Grid,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
  // uncomment to add turns
  // const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);

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
    // uncomment to reset turns
    // setTurns(0);
    setCurrentPlayer(1);
    setPlayerOneScore(0);
    setPlayerTwoScore(0);
    setGameOver(false);
  };

  const handleCardClick = (card: Card) => {
    if (!disabled && !card.matched) {
      setFirstCard(firstCard ? firstCard : card);
      setSecondCard(firstCard ? card : null);
    }
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
        setCurrentPlayer(currentPlayer === 1 ? 1 : 2);
        setPlayerOneScore(
          currentPlayer === 1 ? playerOneScore + 1 : playerOneScore
        );
        setPlayerTwoScore(
          currentPlayer === 2 ? playerTwoScore + 1 : playerTwoScore
        );
        resetCards();
      } else {
        setTimeout(() => {
          resetCards();
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    newGame();
  }, []);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    // if you want to add turns uncomment this line and comment out the one below
    // setTurns(turns + 1);
    setDisabled(false);
  };

  const handleGameOver = () => {
    return playerOneScore > playerTwoScore
      ? `Player 1 wins with a score of ${playerOneScore} to ${playerTwoScore}!`
      : playerTwoScore > playerOneScore
      ? `Player 2 wins with a score of ${playerTwoScore} to ${playerOneScore}! `
      : "It's a tie!";
  };

  return (
    <>
      <Stack w="100%" align="center" justify="center" spacing={5}>
        <Heading>Synthesis Memory Game</Heading>
        {gameOver ? (
          <Heading> {handleGameOver()} </Heading>
        ) : (
          <Heading size="md">Player {currentPlayer}'s turn</Heading>
        )}

        {/* uncomment to add total turns text */}
        {/* <Text>Total Turns: {turns}</Text> */}
        <Button colorScheme="blue" onClick={newGame}>
          New Game
        </Button>
        <HStack w="50%" justify="space-between" mb={10}>
          <Text>Player 1: {playerOneScore}</Text>
          <Text>Player 2: {playerTwoScore}</Text>
        </HStack>
        <Divider bgColor={bgColor} h="1px" />
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {cards.map((card) => (
            <Cards
              key={card.id}
              card={card}
              handleCardClick={handleCardClick}
              flipped={
                card === firstCard || card === secondCard || card.matched
              }
              disabled={disabled}
            />
          ))}
        </Grid>
      </Stack>
      {gameOver && (
        <Modal isOpen={gameOver} onClose={newGame} isCentered>
          <ModalOverlay />
          <ModalContent textAlign="center" bg="grey">
            <ModalHeader>
              <Stack>
                <Heading> Game Over! </Heading>
                <Divider bgColor={bgColor} h="1px" />
                <Heading> {handleGameOver()}</Heading>
              </Stack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Button size="lg" colorScheme="blue" onClick={newGame}>
                New Game
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default synthesisMemory;
