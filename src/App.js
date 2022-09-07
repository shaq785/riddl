import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import Statistics from './components/Stats';
import Alert from './components/Alert';
import {createContext, useState, useEffect} from 'react';
import {boardDefault, generateWordSet } from "./Words";
import {useLocalStorage} from "./useLocalStorage";


// import { generateRiddleSet } from "./Riddles"
// import Riddles from "./Riddles"

export const AppContext = createContext();

function App() {

  const boardValidationGridDefault = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
];


  const [board, setBoard] = useState(boardDefault);
  const [boardValidationGrid, setBoardValidationGrid] = useState(boardValidationGridDefault);
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0});
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [question, setQuestion] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});


  //LOCAL STORAGE
  const [gamesPlayedLS] = useLocalStorage('gamesPlayedLSTotal', 0);
  const [gamesWonLS] = useLocalStorage('gamesWonLSTotal', 0);
  // const [gamesLostLS] = useLocalStorage('gamesLostLSTotal', 0);=


  const [firstAttempt] = useLocalStorage('first', 0);
  const [secAttempt] = useLocalStorage('second', 0);
  const [thirdAttempt] = useLocalStorage('third', 0);
  const [fourthAttempt] = useLocalStorage('fourth', 0);
  // const [winMsg] = localStorage.setItem('winAlertMsg', "")

  const newBoard = [...board];


  const [gamesPlayedTotal, setGamesPlayedTotal] = useState({played: gamesPlayedLS});
  const [gamesWonTotal, setGamesWonTotal] = useState({won: gamesWonLS});
  // const [gamesLostTotal, setGamesLostTotal] = useState({lost: gamesLostLS});
  const [winAttempt, setWinAttempt] = useState({first: firstAttempt, second: secAttempt, third: thirdAttempt, fourth: fourthAttempt, winAlert: ""});

  // const dailyTimer = dateFormat(nextDay, "mmmm dS, yyyy");

  // const [riddleSet, setRiddleSet] = useState(new Set());
  // const [correctRiddle, setCorrectRiddle] = useState("")

  var firstAttWord = localStorage.getItem('firstAttWord');
  var secAttWord = localStorage.getItem('secAttWord');
  var thirdAttWord = localStorage.getItem('thirdAttWord');
  var fourthAttWord = localStorage.getItem('fourthAttWord');

  const [saveAttempt, setSaveAttempt] = useState({saveFirst: firstAttWord, saveSecond: secAttWord, saveThird: thirdAttWord, saveFourth: fourthAttWord});

  console.log('SAVE ATTEMPTS', saveAttempt)
  
  const [ids] = useLocalStorage('idsWon', '');
  

  Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
  }
  Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
  }

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysAnswer);
      setQuestion(words.todaysQuestion);

      if (window.performance) {
        if (performance.navigation.type === 1) {
          // console.log( "This page is reloaded" );
          if (ids.includes(words.todaysAnswer)) {
            setGameOver({gameOver: true ,guessedWord: true})
            setWinAttempt({
              first: winAttempt.first, 
              second: winAttempt.second, 
              third: winAttempt.third, 
              fourth: winAttempt.fourth,
              winAlert: "Already Played" })
          } else{
            setGameOver({gameOver: false})
          }

          // if(newBoard !== [...board] ){
          if(firstAttWord !== ""){
            const newBoard = [
              Array.from(saveAttempt.saveFirst),
              Array.from(saveAttempt.saveSecond),
              Array.from(saveAttempt.saveThird),
              Array.from(saveAttempt.saveFourth)
            ]
            setBoard(newBoard);
          }
        } else {
          // console.log( "This page is not reloaded");
        }
      }
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

    // console.log("Current Attempt", currAttempt.attempt);

    if(currAttempt.attempt === 0 ){
      localStorage.setItem('first', Number(firstAttempt) + 1);
      localStorage.setItem('winAlertMsg', "Wow, So Smart!");
      setWinAttempt({
        first: winAttempt.first + 1, 
        second: winAttempt.second, 
        third: winAttempt.third, 
        fourth: winAttempt.fourth,
        winAlert: "Wow, So Smart!" })
    } else if(currAttempt.attempt === 1){
      localStorage.setItem('second', Number(secAttempt) + 1);
      localStorage.setItem('winAlertMsg', "Amazing Job!");
      setWinAttempt({
        first: winAttempt.first, 
        second: winAttempt.second + 1, 
        third: winAttempt.third, 
        fourth: winAttempt.fourth,
        winAlert: "Amazing Job!" })
    }else if(currAttempt.attempt === 2){
      localStorage.setItem('third', Number(thirdAttempt) + 1);
      localStorage.setItem('winAlertMsg', "Pretty Average" );
      setWinAttempt({
        first: winAttempt.first, 
        second: winAttempt.second, 
        third: winAttempt.third + 1, 
        fourth: winAttempt.fourth,
        winAlert: "Pretty Average" });
    }else{
      localStorage.setItem('fourth', Number(fourthAttempt) + 1);
      localStorage.setItem('winAlertMsg', "Ooo Close Call");
      setWinAttempt({
        first: winAttempt.first, 
        second: winAttempt.second, 
        third: winAttempt.third, 
        fourth: winAttempt.fourth + 1,
        winAlert: "Ooo Close Call" })
    }
    
    return;
  }

  //DYNAMIC VARIABLES BASED ON ANSWER LETTER POS
  const lastLetterPos = correctWord.length;
  const [alertText, setalertText] = useState("");
  const [activeAlert, setactiveAlert] = useState({alert: false});
  // const alertText = "";


  const onNewAlert = (e) =>{
    setactiveAlert({alert: true});
    setTimeout(() => {
      setactiveAlert({alert: false});
    }, 2000);
    // console.log('ALERT CHANGE', activeAlert)
  }
  
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > lastLetterPos - 1) return false;
    if (gameOver.gameOver === true) return;
    // console.log(gameOver.gameOver, "GAME OVER")
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    console.log(keyVal)
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
  const validateBoard = () => {
    // console.log(board, boardValidationGrid);
    let newValBoard = [...boardValidationGrid];
    board.map((item,index) => {
      item.map((ltr, i ) => {
        //console.log(correctWord, ltr, index, i);
        ltr = ltr.toLowerCase();
        const lowerCorrectWord = correctWord.toLowerCase();
        if(ltr === ""){
          return null;
        }
        if(ltr === lowerCorrectWord[i]){
          newValBoard[index][i] = "🟩";
          return null;
        }
        if(lowerCorrectWord.indexOf(ltr) < 0){
          newValBoard[index][i] = "⬛";
          return null;
        }
        newValBoard[index][i] = "🟨";
        return null;
      })
      setBoardValidationGrid(newValBoard);
      return null;
    });

    //console.log(boardValidationGrid)
  }
  const onEnter = () => {
    if (currAttempt.letterPos !== lastLetterPos){
      setalertText("Not enough letters");
      onNewAlert();
      return false;
    }
    validateBoard();
    let currWord = "";
    for(let i = 0; i < lastLetterPos; i++){
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({attempt: currAttempt.attempt + 1, letterPos: 0});
    }else {
      setalertText("Word Not Found");
      onNewAlert();
      return;
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()){
      var ids = localStorage.getObject('idsWon');
      // console.log('got',ids);
      if(ids){
        ids = ids.split(',');
      } else {
        ids = [];
      }

 
      if(!ids.includes(correctWord)){
        gamesPlayedCount();
        gamesWon();
        winAttemptCount();
        setGameOver({gameOver: true, guessedWord: true});
        setGamesPlayedTotal({played: gamesPlayedTotal.played + 1 });
        setGamesWonTotal({won: gamesWonTotal.won + 1 });
        ids.push(correctWord);
        // console.log("pushed",ids);

        // console.log(board,boardValidationGrid);
        var joined = ids.join(",");
        // console.log('save joined',joined);
        localStorage.setObject('idsWon',joined);
      } else {
        // console.log('you already guessed this riddle');
        setGameOver({gameOver: true, guessedWord: true});
      }
      return;
    }

    if (currAttempt.attempt === 3){
      gamesPlayedCount();
      // gamesLost();
      setGameOver({gameOver: true, guessedWord: false})
      setGamesPlayedTotal({played: gamesPlayedTotal.played + 1 })
      // console.log('save joined',joined);
      localStorage.setObject('idsWon',correctWord);
      // console.log("Win Attempt", currAttempt.attempt)
      // setGamesLostTotal({lost: gamesLostTotal.lost + 1 }) 
    }

    //SAVING ATTEMPT VALUES
    if(currAttempt.attempt === 0 ){
      setSaveAttempt({
        saveFirst: currWord,
        saveSecond: saveAttempt.saveSecond,
        saveThird: saveAttempt.saveThird,
        saveFourth: saveAttempt.saveFourth
      })
      localStorage.setItem('firstAttWord', currWord);
      
    } else if(currAttempt.attempt === 1){
      setSaveAttempt({
        saveFirst: saveAttempt.saveFirst,
        saveSecond: currWord,
        saveThird: saveAttempt.saveThird,
        saveFourth: saveAttempt.saveFourth
      })
      localStorage.setItem('secAttWord', currWord);

      // const newBoard = savedBoard;
    }else if(currAttempt.attempt === 2){
      setSaveAttempt({
        saveFirst: saveAttempt.saveFirst,
        saveSecond: saveAttempt.saveSecond,
        saveThird: currWord,
        saveFourth: saveAttempt.saveFourth
      })
      localStorage.setItem('thirdAttWord', currWord);
    }else{
      setSaveAttempt({
        saveFirst: saveAttempt.saveFirst,
        saveSecond: saveAttempt.saveSecond,
        saveThird: saveAttempt.saveThird,
        saveFourth: currWord
      })
      localStorage.setItem('fourthAttWord', currWord);
    }

    // localStorage.setItem('firstAttWord', saveAttempt.saveFirst);
    // localStorage.setItem('secAttWord', saveAttempt.saveSecond);
    // localStorage.setItem('thirdAttWord', saveAttempt.saveThird);
    // localStorage.setItem('fourthAttWord', saveAttempt.saveFourth);

    var firstAttWord = localStorage.getItem('firstAttWord');
    var secAttWord = localStorage.getItem('secAttWord');
    var thirdAttWord = localStorage.getItem('thirdAttWord');
    var fourthAttWord = localStorage.getItem('fourthAttWord');

    const newBoard = [
      Array.from(firstAttWord),
      Array.from(secAttWord),
      Array.from(thirdAttWord),
      Array.from(fourthAttWord)
    ]




    console.log('SAVE ATTEMPT', saveAttempt);
    console.log('NEW BOARD', newBoard, 'OLD BOARD', [...board]);

  };

  console.log(newBoard, 'NEW BOARD');


  
  return (
    <div className="app">
      <nav>
        <h1>Riddl</h1>
        <Statistics 
            gamesPlayed={gamesPlayedTotal.played} 
            gamesWon={gamesWonTotal.won} 
            firstAttempt={winAttempt.first}
            secAttempt={winAttempt.second}
            thirdAttempt={winAttempt.third}
            fourthAttempt={winAttempt.fourth} 
          />
      </nav>
      <AppContext.Provider
        value={{
          board,
          boardValidationGrid,
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
          onNewAlert,
          activeAlert
        }}
      >
        <div className="game">
          <Alert status={activeAlert.alert} text={alertText}/>
          <h2>{question}</h2>
          <Board word={correctWord}/>
          <Keyboard />
          {gameOver.gameOver ? 
            <GameOver 
              shareGrid={boardValidationGrid}
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
