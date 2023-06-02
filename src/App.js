import "./assets/styles/App.css";
import { useState, useEffect } from "react";
import { shuffleArray } from "./helpers";
import { CARDS_LOGOS, TIMEOUTGAME } from "./constants/index";
/* import ControlPanel from "./components/control-panel/control-panel.component";
import Footer from "./components/footer/footer.component";
import GamePanel from "./components/game-panel/game-panel.component";
import Header from "./components/header/header.component"; */
import { ControlPanel, GamePanel, Header, Footer } from "./components";

let timerId = undefined;

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [cards, setCards] = useState([]);
  const [timer, setTimer] = useState(TIMEOUTGAME);


  function handleGameStart() {
    if (gameStarted) {
      console.log("Vou terminar o jogo");
      setGameStarted(false);
    } else {
      console.log("Vou iniciar o jogo");
      setGameStarted(true);
    }
  }

  function handleLevelChange(e) {
    const { value } = e.currentTarget;
    setSelectedLevel(value);

    let numOfCards = 0;
    switch (value) {
      case "1":
        numOfCards = 3;
        break;
      case "2":
        numOfCards = 6;
        break;
      case "3":
        numOfCards = 10;
        break;

      default:
        numOfCards = 0;
        break;
    }

    const initialCards = shuffleArray(CARDS_LOGOS);
    const slicedInitialCards = initialCards.slice(0, numOfCards);

    let doubledCardsObjects = [];
    slicedInitialCards.forEach((card, index) => {
      doubledCardsObjects.push({
        key: `${card}-${index}`,
        id: card,
        name: card,
      });
      doubledCardsObjects.push({
        key: `${card}-${index}-clone`,
        id: `${card}-clone`,
        name: card,
      });
    });
    doubledCardsObjects = shuffleArray(doubledCardsObjects);
    setCards(doubledCardsObjects);
  }

  /**
   * When the component mounts, set an interval for the timer.
   */
  useEffect(() => {
    if (gameStarted) {
      let nextTimer;
      timerId = setInterval(() => {
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          return nextTimer;
        });
        if (nextTimer === 0) {
          setGameStarted(false);
        }
      }, 1000);
    } else if (timer !== TIMEOUTGAME) {
      setTimer(TIMEOUTGAME);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [gameStarted, timer]);

  return (
    <div id="container">
      <Header />
      <main className="main-content">
        <ControlPanel
          timer={timer}
          gameStarted={gameStarted}
          selectedLevel={selectedLevel}
          onGameStart={handleGameStart}
          onLevelChange={handleLevelChange}
        />        
        <GamePanel cards={cards} selectedLevel={selectedLevel} gameStarted={gameStarted} onGameStart={handleGameStart}/>
      </main>
      <Footer />
    </div>
  );
}

export default App;
// Esta linha também poderia ser eliminada
// e adefinição da funsão ser substituida
// export default function App() {
