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
  const [gamesPlayedTotal, setGamesPlayedTotal] = useLocalStorage('gamesPlayedTotal', 0);
  const [gamesWonTotal, setGamesWonTotal] = useLocalStorage('gamesWonTotal', 0);
  const [gamesLostTotal, setGamesLostTotal] = useLocalStorage('gamesLostTotal', 0);

  // const [riddleSet, setRiddleSet] = useState(new Set());
  // const [correctRiddle, setCorrectRiddle] = useState("")
  

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysAnswer);
      setQuestion(words.todaysQuestion);
    });
  }, []);

  function gamesPlayedCount(gamesPlayedTotal) {
      const count = localStorage.getItem('gamesPlayedTotal');
      const current = Number(count) + 1;
      let newCount = String(current);
      localStorage.setItem('gamesPlayedTotal', newCount)
      return ;
  }

  function gamesWon(gamesWonTotal) {
    const winCount = localStorage.getItem('gamesWonTotal');
    const winCurrent = Number(winCount) + 1;
    let newWinCount = String(winCurrent);
    localStorage.setItem('gamesWonTotal', newWinCount)
    return ;
  }

  function gamesLost(gamesLostTotal) {
    const lossCount = localStorage.getItem('gamesLostTotal');
    const LossCurrent = Number(lossCount) + 1;
    let newLossCount = String(LossCurrent);
    localStorage.setItem('gamesLostTotal', newLossCount)
    return ;
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
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()){
      gamesPlayedCount();
      gamesWon();
      setGameOver({gameOver: true, guessedWord: true})
      return;
    }

    if (currAttempt.attempt === 3){
      gamesPlayedCount();
      gamesLost();
      setGameOver({gameOver: true, guessedWord: false})
    }

  }

  console.log('localStorage', localStorage);

  

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
          {gameOver.gameOver ? <GameOver /> : ''}
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
