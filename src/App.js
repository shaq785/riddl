import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import Alert from './components/Alert';
import {createContext, useState, useEffect} from 'react';
import { boardDefault, generateWordSet } from "./Words";
import { useLocalStorage } from "./useLocalStorage";

// import { generateRiddleSet } from "./Riddles"
// import Riddles from "./Riddles"

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [question, setQuestion] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  // const [show, setShow] = useState({show: false})


  //LOCAL STORAGE
  const [gamesPlayedLS] = useLocalStorage('gamesPlayedLSTotal', 0);
  const [gamesWonLS] = useLocalStorage('gamesWonLSTotal', 0);
  const [gamesLostLS] = useLocalStorage('gamesLostLSTotal', 0);

  const [gamesPlayedTotal, setGamesPlayedTotal] = useState({played: gamesPlayedLS});
  const [gamesWonTotal, setGamesWonTotal] = useState({won: gamesWonLS});
  const [gamesLostTotal, setGamesLostTotal] = useState({lost: gamesLostLS});


  

  // const [riddleSet, setRiddleSet] = useState(new Set());
  // const [correctRiddle, setCorrectRiddle] = useState("")
  

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysAnswer);
      setQuestion(words.todaysQuestion);
    });
  }, []);

  function gamesPlayedCount(gamesPlayedLS) {
      const count = localStorage.getItem('gamesPlayedLSTotal');
      const current = Number(count) + 1;
      let newCount = String(current);
      localStorage.setItem('gamesPlayedLSTotal', newCount)
      return newCount;
  }

  function gamesWon(gamesWonLS) {
    const winCount = localStorage.getItem('gamesWonLSTotal');
    const winCurrent = Number(winCount) + 1;
    let newWinCount = String(winCurrent);
    localStorage.setItem('gamesWonLSTotal', newWinCount)
    return newWinCount;
  }

  function gamesLost(gamesLostLS) {
    const lossCount = localStorage.getItem('gamesLostLSTotal');
    const LossCurrent = Number(lossCount) + 1;
    let newLossCount = String(LossCurrent);
    localStorage.setItem('gamesLostLSTotal', newLossCount)
    return newLossCount;
  }

  


  // useEffect(() => {
  //   generateRiddleSet().then((riddles) => {
  //     setRiddleSet(riddles.riddleSet);
  //     setCorrectRiddle(riddles.todaysRiddle);
  //   });
  // }, []);
  
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1})
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = "";
    for(let i = 0; i < 5; i++){
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
    }else {
      alert("Word Not Found");
      return false;
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()){
      gamesPlayedCount();
      gamesWon();
      setGameOver({gameOver: true, guessedWord: true})
      setGamesPlayedTotal({played: gamesPlayedTotal.played + 1 })
      setGamesWonTotal({won: gamesWonTotal.won + 1 })
      return;
    }

    if (currAttempt.attempt === 3){
      gamesPlayedCount();
      gamesLost();
      setGameOver({gameOver: true, guessedWord: false})
      setGamesPlayedTotal({played: gamesPlayedTotal.played + 1 })
      setGamesLostTotal({lost: gamesLostTotal.lost + 1 }) 
    }

  }

  

  // const onOrientation = () => {
    
  //   if(window.orientation == 0)
  //   {
  //       setShow({show: false})
  //   }
  //   else
  //   {
  //       setShow({show: true})
  //   }

  // }
  
  return (
    <div className="App">
      <nav><h1>Riddl</h1></nav>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          question,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          gamesPlayedTotal,
          gamesWonTotal,
          gamesLostTotal
        }}
      >
        <Alert />
        <div className="game">
          <h2>{question}</h2>
          <Board />
          <Keyboard />
          {gameOver.gameOver ? <GameOver gamesPlayed={gamesPlayedTotal.played} gamesWon={gamesWonTotal.won} gamesLost={gamesLostTotal.lost} /> : ''}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
