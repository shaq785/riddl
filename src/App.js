import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import Statistics from './components/Stats';
import Alert from './components/Alert';
import React from "react";
import {boardDefault, generateWordSet } from "./Words";


// import { generateRiddleSet } from "./Riddles"
// import Riddles from "./Riddles"

const defaultState = {
  board: [...boardDefault],
  boardValidationGrid:  [...boardDefault],
  currAttempt: {attempt: 0, letterPos: 0},
  wordSet: new Set(),
  correctWord: "",
  question: "",
  disabledLetters: [],
  gameOver: {gameOver: false, guessedWord: false},




  firstAttempt: 0,
  secAttempt: 0,
  thirdAttempt: 0,
  fourthAttempt: 0,

  newBoard: [...boardDefault],


  gamesPlayedTotal: {played: 0},
  gamesWonTotal: {won: 0},
  winAttempt: {
    first: 0, 
    second: 0, 
    third: 0, 
    fourth: 0, 
    winAlert: ""
  },


  firstAttWord: "",
  secAttWord: "",
  thirdAttWord: "",
  fourthAttWord: "",

  saveAttempt: {
    saveFirst: "",
    saveSecond: "",
    saveThird: "",
    saveFourth: "",
  },

  ids: [],


  alertText: "",
  activeAlert: {alert: false},
}
export const AppContext = React.createContext();

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
}
Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}



class App extends React.Component {
  state = {...defaultState}

 

  componentDidMount() {
    //Get state from local storage
    let storedState = localStorage.getObject("state");
    this.setState({
      ...storedState
    }, function(){
      //do stuff after updating the stored state.
      //--------------- code from old useEffect(() => {},[]);
      let ns = {...this.state};
      generateWordSet().then((words) => {
        ns.wordSet = words.wordSet;
        ns.correctWord = words.todaysAnswer;
        ns.question = words.todaysQuestion;
  
        if (window.performance) {
          if (performance.navigation.type === 1) {
            // console.log( "This page is reloaded" );
            if (this.state.ids.includes(words.todaysAnswer)) {
              ns.gameOver = {gameOver: true ,guessedWord: true};
              ns.winAttempt = {
                first: this.state.winAttempt.first, 
                second: this.state.winAttempt.second, 
                third: this.state.winAttempt.third, 
                fourth: this.state.winAttempt.fourth,
                winAlert: "Already Played" };
            } else{
              ns.gameOver = {gameOver: false};
            }
  
            // if(newBoard !== [...board] ){
            if(this.state.firstAttWord !== ""){
              const newBoard = [
                Array.from(this.state.saveAttempt.saveFirst),
                Array.from(this.state.saveAttempt.saveSecond),
                Array.from(this.state.saveAttempt.saveThird),
                Array.from(this.state.saveAttempt.saveFourth)
              ]
              ns.board = newBoard;
            }
          } else {
            // console.log( "This page is not reloaded");
          }
        }
        this.setState(ns);
      });
    });
    
  }

  componentDidUpdate() {
    //Update local storage to match state
    localStorage.setObject("state", this.state);
  }


  //This is the method to set the context data.
  setContext = (data) => {
    this.setState({ data });
  };
  
  winAttemptCount() {
    let ns = {...this.state};

    // console.log("Current Attempt", currAttempt.attempt);

    if(this.state.currAttempt.attempt === 0 ){
      ns.winAttempt = {
        first: this.state.winAttempt.first + 1, 
        second: this.state.winAttempt.second, 
        third: this.state.winAttempt.third, 
        fourth: this.state.winAttempt.fourth,
        winAlert: "Wow, So Smart!" };
    } else if(this.state.currAttempt.attempt === 1){
      ns.winAttempt = {
        first: this.state.winAttempt.first, 
        second: this.state.winAttempt.second + 1, 
        third: this.state.winAttempt.third, 
        fourth: this.state.winAttempt.fourth,
        winAlert: "Amazing Job!" };
    }else if(this.state.currAttempt.attempt === 2){
      ns.winAttempt = {
        first: this.state.winAttempt.first, 
        second: this.state.winAttempt.second, 
        third: this.state.winAttempt.third + 1, 
        fourth: this.state.winAttempt.fourth,
        winAlert: "Pretty Average" };
    }else{
      ns.winAttempt = {
        first: this.state.winAttempt.first, 
        second: this.state.winAttempt.second, 
        third: this.state.winAttempt.third, 
        fourth: this.state.winAttempt.fourth + 1,
        winAlert: "Ooo Close Call" };
    }
    
    this.setState(ns);
    return;
  }

  //DYNAMIC VARIABLES BASED ON ANSWER LETTER POS
  lastLetterPos = this.state.correctWord.length;
  // const alertText = "";


  onNewAlert = (e) =>{
    let ns = {...this.state};
    ns.activeAlert = {alert: true};
    this.setState(ns);
    setTimeout(() => {
      ns.activeAlert = {alert: false};
      this.setState(ns);
    }, 2000);

    // console.log('ALERT CHANGE', activeAlert)
  }
  
  onSelectLetter = (keyVal) => {
    let ns = {...this.state};
    if (this.state.currAttempt.letterPos > this.state.lastLetterPos - 1) return false;
    if (this.state.gameOver.gameOver === true) return;
    // console.log(gameOver.gameOver, "GAME OVER")
    const newBoard = [...this.state.board]
    newBoard[this.state.currAttempt.attempt][this.state.currAttempt.letterPos] = keyVal
    console.log(keyVal)
    ns.board = newBoard;
    ns.currAttempt = {...this.state.currAttempt, letterPos: this.state.currAttempt.letterPos + 1};
    this.setState(ns);
  }

  onDelete = () => {
    let ns = {...this.state};
    if (this.state.currAttempt.letterPos === 0) return;
    const newBoard = [...this.state.board]
    newBoard[this.state.currAttempt.attempt][this.state.currAttempt.letterPos - 1] = "";
    ns.board = newBoard;
    ns.currAttempt = {...this.state.currAttempt, letterPos: this.state.currAttempt.letterPos - 1};

    this.setState(ns);
  }
  validateBoard = () => {
    // console.log(board, boardValidationGrid);
    let ns = {...this.state};
    let newValBoard = [...this.state.boardValidationGrid];
    this.state.board.map((item,index) => {
      item.map((ltr, i ) => {
        //console.log(correctWord, ltr, index, i);
        ltr = ltr.toLowerCase();
        const lowerCorrectWord = this.state.correctWord.toLowerCase();
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
      ns.boardValidationGrid = newValBoard;
      this.setState(ns);
      return null;
    });

    //console.log(boardValidationGrid)
  }
  onEnter = () => {
    if (this.state.currAttempt.letterPos !== this.state.lastLetterPos){
      this.setState({...this.state, alertText:"Not enough letters"});
      this.onNewAlert();
      return false;
    }
    this.validateBoard();
    let currWord = "";
    for(let i = 0; i < this.state.lastLetterPos; i++){
      currWord += this.state.board[this.state.currAttempt.attempt][i];
    }

    if (this.state.wordSet.has(currWord.toLowerCase())) {
      this.setState({currAttempt:{attempt: this.state.currAttempt.attempt + 1, letterPos: 0}});
    }else {
      this.setState({alertText:"Word Not Found"});
      this.onNewAlert();
      return;
    }

    let ns = {...this.state};

    if (currWord.toLowerCase() === this.state.correctWord.toLowerCase()){
      // console.log('got',ids);
      if(!ns.ids.includes(this.state.correctWord)){
        this.winAttemptCount();
        ns.gameOver = {gameOver: true, guessedWord: true};
        ns.gamesPlayedTotal = {played: this.state.gamesPlayedTotal.played + 1 };
        ns.gamesWonTotal = {won: this.state.gamesWonTotal.won + 1 };

        ns.ids.push(this.state.correctWord);
      } else {
        // console.log('you already guessed this riddle');
        ns.gameOver = {gameOver: true, guessedWord: true};
      }
      this.setState(ns);
      return;
    }

    if (this.state.currAttempt.attempt === 3){

      this.gamesPlayedCount();
      // gamesLost();
      ns.gameOver = {gameOver: true, guessedWord: false};
      ns.gamesPlayedTotal = {played: this.state.gamesPlayedTotal.played + 1 };
      // console.log('save joined',joined);

      ns.ids = this.state.correctWord;
      // console.log("Win Attempt", currAttempt.attempt)
      // setGamesLostTotal({lost: gamesLostTotal.lost + 1 }) 
    }

    //SAVING ATTEMPT VALUES
    if(this.state.currAttempt.attempt === 0 ){
      ns.saveAttempt = {
        saveFirst: currWord,
        saveSecond: this.state.saveAttempt.saveSecond,
        saveThird: this.state.saveAttempt.saveThird,
        saveFourth: this.state.saveAttempt.saveFourth
      };
      ns.firstAttWord = currWord;
      
    } else if(this.state.currAttempt.attempt === 1){
      ns.saveAttempt = {
        saveFirst: this.state.saveAttempt.saveFirst,
        saveSecond: currWord,
        saveThird: this.state.saveAttempt.saveThird,
        saveFourth: this.state.saveAttempt.saveFourth
      };
      ns.secAttWord = currWord;

      // const newBoard = savedBoard;
    }else if(this.state.currAttempt.attempt === 2){
      ns.saveAttempt = {
        saveFirst: this.state.saveAttempt.saveFirst,
        saveSecond: this.state.saveAttempt.saveSecond,
        saveThird: currWord,
        saveFourth: this.state.saveAttempt.saveFourth
      };
      ns.thirdAttWord = currWord;
    }else{
      ns.saveAttempt = {
        saveFirst: this.state.saveAttempt.saveFirst,
        saveSecond: this.state.saveAttempt.saveSecond,
        saveThird: this.state.saveAttempt.saveThird,
        saveFourth: currWord
      };
      ns.fourthAttWord = currWord;
    }


    const newBoard = [
      Array.from(ns.firstAttWord),
      Array.from(ns.secAttWord),
      Array.from(ns.thirdAttWord),
      Array.from(ns.fourthAttWord)
    ]




    console.log('SAVE ATTEMPT', ns.saveAttempt);
    console.log('NEW BOARD', newBoard, 'OLD BOARD', [...this.state.board]);
    ns.board = newBoard;
    this.setState(ns);
  };



  render(){
    const publicMethods = {
      onSelectLetter: this.onSelectLetter,
      onEnter: this.onEnter,
      onDelete: this.onDelete,
      setContext: this.setContext,
    }
    return (
      <AppContext.Provider value={{...this.state, ...publicMethods}}>
        <div className="app">
          <nav>
            <h1>Riddl</h1>
            <Statistics 
                gamesPlayed={this.state.gamesPlayedTotal.played} 
                gamesWon={this.state.gamesWonTotal.won} 
                firstAttempt={this.state.winAttempt.first}
                secAttempt={this.state.winAttempt.second}
                thirdAttempt={this.state.winAttempt.third}
                fourthAttempt={this.state.winAttempt.fourth} 
              />
          </nav>
            <div className="game">
              <Alert status={this.state.activeAlert.alert} text={this.state.alertText}/>
              <h2>{this.state.question}</h2>
              <Board word={this.state.correctWord}/>
              <Keyboard />
              {this.state.gameOver.gameOver ? 
                <GameOver 
                  shareGrid={this.state.boardValidationGrid}
                  gamesPlayed={this.state.gamesPlayedTotal.played} 
                  gamesWon={this.state.gamesWonTotal.won} 
                  firstAttempt={this.state.winAttempt.first}
                  secAttempt={this.state.winAttempt.second}
                  thirdAttempt={this.state.winAttempt.third}
                  fourthAttempt={this.state.winAttempt.fourth}
                  winAlert={this.state.winAttempt.winAlert}
                /> 
                : ''
              }
            </div>
        </div>
      </AppContext.Provider>
    );
  }
}


export default App;
