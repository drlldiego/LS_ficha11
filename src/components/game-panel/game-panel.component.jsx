import React from "react";
import {useState, useEffect} from "react";
import { Card } from "../index";
import { checkIfIsFlipped, checkIfIsMatched } from "../../helpers";
/* import { CARDS_LOGOS } from "../../constants"; */

function GamePanel({ cards, selectedLevel, gameStarted, onGameStart }) {
  let gameClasse = "";

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  function handleClickCard(card) {
    if (gameStarted) {      
        setFlippedCards(...flippedCards, card);      
    }
  }

   
  /* function handleClickCard(card) {
    if (gameStarted) {      
        const newFlippedCards = flippedCards;
      newFlippedCards.push(card);
      setFlippedCards(newFlippedCards);
    }
  } */
  
  const processMatchingCards = () => {
    const [card1, card2] = flippedCards;
    const cardsAreEqual = card1.name === card2.name;
    if (cardsAreEqual) {
    setTimeout(() => {
    setMatchedCards((previousState) => [...previousState, ...flippedCards]);
    setFlippedCards([]);
    }, 500);
    } else {
    setTimeout(() => {
    setFlippedCards([]);
    }, 500);
    }
    };
   

  if (selectedLevel === "2") gameClasse = "intermedio";
  if (selectedLevel === "3") gameClasse = "avancado";

  /* Limpar as variáveis de estado flippedCards e matchedCard sempre que o jogo é iniciado */
  useEffect(() => {
    if (gameStarted) {            
      setFlippedCards([]);
      setMatchedCards([]);
    } 
  }, [gameStarted]);

  /* Terminar o jogo quando matchedCards tem o mesmo número de cartas que o array cards */
  useEffect(() => {
    if (matchedCards.length === cards.length && gameStarted) {      
      onGameStart();
    } 
  }, [matchedCards]);

  /* Processar a função processMatchingCards quando o jogo estiver iniciado e o array das cartas viradas tiver dois elementos */
  useEffect(() => {
    if (gameStarted && flippedCards.length === 2) {      
      processMatchingCards();
    } 
    return () => {};  //Função de limpezas que é executada no umounting
  }, [flippedCards]);



  return (
    <section className="game-panel">
      <h3 className="sr-only">Peças do Jogo</h3>
      <div id="game" className={gameClasse}>
        {/* <Card name="angular"></Card>
        <Card name="html"></Card>
        <Card name="bootstrap"></Card>
        <Card name="react"></Card>
        <Card name="javascript"></Card>
        <Card name="vue"></Card> */}

        {/*  {CARDS_LOGOS.map((e) => (
          <Card key={e} name={e} />
        ))} */}

        {cards.map((card) => (
          
          <Card key={card.key} 
                card={card} 
                onClickCard={handleClickCard} 
                flipped={checkIfIsFlipped(matchedCards, flippedCards, card.id)} 
                matched={checkIfIsMatched(matchedCards, card.id)}
          />

        ))}
      </div>
    </section>
  );
}

export default GamePanel;
