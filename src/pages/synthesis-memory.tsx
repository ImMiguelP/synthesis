import Cards from "@/Components/synMemory/Cards";
import { Card } from "@/Components/synMemory/types";
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

const cardImages = [
  { src: "/images/synMemory/cat.png", matched: false },
  { src: "/images/synMemory/dog.png", matched: false },
  { src: "/images/synMemory/frog.png", matched: false },
  { src: "/images/synMemory/ghost.png", matched: false },
  { src: "/images/synMemory/heart.png", matched: false },
  { src: "/images/synMemory/spaceship.png", matched: false },
];

const synthesisMemory = () => {
  const [cards, setCards] = useState<Card[]>([]);
  // uncomment to add turns
  // const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [scores, setScores] = useState({ playerOne: 0, playerTwo: 0 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const bgColor = useColorModeValue("black", "white");

  const newGame = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setFirstCard(null);
    setSecondCard(null);
    // uncomment to reset turns
    // setTurns(0);
    setCurrentPlayer(1);
    setScores({ playerOne: 0, playerTwo: 0 });
    setGameOver(false);
  };

  const handleCardClick = (card: Card) => {
    if (!disabled && !card.matched) {
      setFirstCard(firstCard || card);
      setSecondCard(firstCard ? card : null);
    }
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);

      if (firstCard.src === secondCard.src) {
        setCards((prev) => {
          return prev.map((card) =>
            card.src === firstCard.src ? { ...card, matched: true } : card
          );
        });

        setCurrentPlayer(currentPlayer === 1 ? 1 : 2);
        setScores((prevScores) => ({
          playerOne:
            currentPlayer === 1
              ? prevScores.playerOne + 1
              : prevScores.playerOne,
          playerTwo:
            currentPlayer === 2
              ? prevScores.playerTwo + 1
              : prevScores.playerTwo,
        }));
        resetCards();
      } else {
        setTimeout(() => {
          resetCards();
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  useEffect(newGame, []);

  useEffect(() => {
    setGameOver(cards.length > 0 && cards.every((card) => card.matched));
  }, [cards]);

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    // if you want to add turns uncomment this line and comment out the one below
    // setTurns(turns + 1);
    setDisabled(false);
  };

  const handleGameOver = () => {
    return scores.playerOne > scores.playerTwo
      ? `Player 1 wins with a score of ${scores.playerOne} to ${scores.playerTwo}!`
      : scores.playerTwo > scores.playerOne
      ? `Player 2 wins with a score of ${scores.playerTwo} to ${scores.playerOne}! `
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
          <Text>Player 1: {scores.playerOne}</Text>
          <Text>Player 2: {scores.playerTwo}</Text>
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
