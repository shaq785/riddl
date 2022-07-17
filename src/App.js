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
  // const [gamesLostLS] = useLocalStorage('gamesLostLSTotal', 0);

  const [firstAttempt] = useLocalStorage('first', 0);
  const [secAttempt] = useLocalStorage('second', 0);
  const [thirdAttempt] = useLocalStorage('third', 0);
  const [fourthAttempt] = useLocalStorage('fourth', 0);


  const [gamesPlayedTotal, setGamesPlayedTotal] = useState({played: gamesPlayedLS});
  const [gamesWonTotal, setGamesWonTotal] = useState({won: gamesWonLS});
  // const [gamesLostTotal, setGamesLostTotal] = useState({lost: gamesLostLS});
  const [winAttempt, setWinAttempt] = useState({first: firstAttempt, second: secAttempt, third: thirdAttempt, fourth: fourthAttempt, winAlert: ""});


  

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

  function winAttemptCount() {
    const firstAttempt = localStorage.getItem('first');
    const secAttempt = localStorage.getItem('second');
    const thirdAttempt = localStorage.getItem('third');
    const fourthAttempt = localStorage.getItem('fourth');

    console.log("Current Attempt", currAttempt.attempt);

    if(currAttempt.attempt === 0 ){
      localStorage.setItem('first', Number(firstAttempt) + 1);
      setWinAttempt({
        first: winAttempt.first + 1, 
        second: winAttempt.second, 
        third: winAttempt.third, 
        fourth: winAttempt.fourth,
        winAlert: "Amazing!" })
    } else if(currAttempt.attempt === 1){
      localStorage.setItem('second', Number(secAttempt) + 1);
      setWinAttempt({
        first: winAttempt.first, 
        second: winAttempt.second + 1, 
        third: winAttempt.third, 
        fourth: winAttempt.fourth,
        winAlert: "Great!" })
    }else if(currAttempt.attempt === 2){
      localStorage.setItem('third', Number(thirdAttempt) + 1);
      setWinAttempt({
        first: winAttempt.first, 
        second: winAttempt.second, 
        third: winAttempt.third + 1, 
        fourth: winAttempt.fourth,
        winAlert: "Good" });
    }else{
      localStorage.setItem('fourth', Number(fourthAttempt) + 1);
      setWinAttempt({
        first: winAttempt.first, 
        second: winAttempt.second, 
        third: winAttempt.third, 
        fourth: winAttempt.fourth + 1,
        winAlert: "Close call" })
    }
    
    return;
  }

  // function gamesLost(gamesLostLS) {
  //   const lossCount = localStorage.getItem('gamesLostLSTotal');
  //   const LossCurrent = Number(lossCount) + 1;
  //   let newLossCount = String(LossCurrent);
  //   localStorage.setItem('gamesLostLSTotal', newLossCount)
  //   return newLossCount;
  // }

  


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
      winAttemptCount();
      setGameOver({gameOver: true, guessedWord: true});
      setGamesPlayedTotal({played: gamesPlayedTotal.played + 1 });
      setGamesWonTotal({won: gamesWonTotal.won + 1 });
      return;
    }

    if (currAttempt.attempt === 3){
      gamesPlayedCount();
      // gamesLost();
      setGameOver({gameOver: true, guessedWord: false})
      setGamesPlayedTotal({played: gamesPlayedTotal.played + 1 })
      console.log("Win Attempt", currAttempt.attempt)
      // setGamesLostTotal({lost: gamesLostTotal.lost + 1 }) 
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
    <div className="app">
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
          gamesWonTotal
        }}
      >
        <Alert />
        <div className="game">
          <h2>{question}</h2>
          <Board />
          <Keyboard />
          {gameOver.gameOver ? 
            <GameOver 
              gamesPlayed={gamesPlayedTotal.played} 
              gamesWon={gamesWonTotal.won} 
              firstAttempt={winAttempt.first}
              secAttempt={winAttempt.second}
              thirdAttempt={winAttempt.third}
              fourthAttempt={winAttempt.fourth}
              winAlert={winAttempt.winAlert}
             /> 
             : ''
          }
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
