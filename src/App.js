
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';
import Statistics from './components/Stats';
import Alert from './components/Alert';
import React from "react";
import {boardDefault, generateWordSet } from "./Words";
import Settings from './components/Settings';
import Info from './components/Info';
import './App.scss';


// import { generateRiddleSet } from "./Riddles"
// import Riddles from "./Riddles"

const defaultState = {
  board: boardDefault(),
  boardValidationGrid:  boardDefault(),
  currAttempt: {attempt: 0, letterPos: 0},
  wordSet: [],
  correctWord: "",
  alertText: "",
  question: "",
  disabledLetters: [],
  shakeRow: false,
  gameOver: {gameOver: false, guessedWord: false},
  mode: 'light',
  constrast: 'nocontrast',
  winAttempt: {
    first: 0, 
    second: 0, 
    third: 0, 
    fourth: 0, 
    winAlert: ""
  },

  attempt: {
    try1: "",
    try2: "",
    try3: "",
    try4: "",
  },

  wins: [],
  played: [],


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
let keyDownBound = false;


class App extends React.Component {
  state = {...defaultState}

 

  componentDidMount() {
    this.keydownEffect();
    // every x mins. check to see if the answer of the day has rolled over.  if so reload the page.
    const refreshMins = 2;
    setInterval(this.refreshTest,refreshMins*60*1000);
    //Get state from local storage
    let storedState = localStorage.getObject("state");
    this.setState({
        ...storedState
    }, function(){
      //do stuff after updating the stored state.
      //--------------- code from old useEffect(() => {},[]);
      let ns = {};
      generateWordSet().then((words) => {
        ns.wordSet = words.wordSet;
        ns.correctWord = words.todaysAnswer;
        ns.question = words.todaysQuestion;
  
            //console.log(this.state.wins, this.state.attempt);
            if (this.state.wins.includes(words.todaysAnswer)) {
              //You already won
              // console.log('ALEREADY WON');
              ns.gameOver = {gameOver: true ,guessedWord: true};
              
              ns.winAttempt = {
                first: this.state.winAttempt.first, 
                second: this.state.winAttempt.second, 
                third: this.state.winAttempt.third, 
                fourth: this.state.winAttempt.fourth,
                winAlert: "Already Played" };
            } else if(this.state.played.includes(words.todaysAnswer)){
              // you completed your last game, but failed
              // console.log('PLAYED AND LOST, SORRY');
            } else if (this.state.correctWord.length > 0 && this.state.correctWord !== words.todaysAnswer){
              console.log('PLAYED A PREVIOUS DAY, you have saved data from a previous day. lets reset but save your stats.')
              ns.board = boardDefault();
              ns.boardValidationGrid = boardDefault();
              ns.currAttempt = {attempt: 0, letterPos: 0};
              ns.gameOver = {gameOver: false};
              ns.attempt = {
                try1: "",
                try2: "",
                try3: "",
                try4: "",
              };
              ns.disabledLetters =[]
            }
            // otherwise you are a new player or are currently playing today clue. do nothing.
  
        this.setState(ns);
      });
    });
    
  }

  componentDidUpdate() {
    //Update local storage to match state
    localStorage.setObject("state", this.state);
  }
  keydownEffect() {
    if(!keyDownBound){
      keyDownBound = true;
      //console.log('bind keydown')
      document.addEventListener('keydown', function(e) {
        const code = e.keyCode;
        let key = String.fromCharCode(code);
        if(code === 8){
          key = 'DEL'
        }
        if(code === 13){
          key = 'ENT'
        }
        //console.log(code,key)
        const keyBtn = document.querySelector('.key-'+key);
        keyBtn.classList.add('active');
        setTimeout(function(){
          keyBtn.classList.remove('active');
        },300);
      });
    }
  }
  refreshTest() {
    generateWordSet().then((words) => {
      if(words.todaysAnswer !== this.state.correctWord){
        window.location.reload();
      }
    });
  }

  //This is the method to set the context data.
  setContext = (data) => {
    this.setState({ data });
  };
  
  winAttemptCount() {
    let ns = {};

    // console.log("Current Attempt", currAttempt.attempt);

    if(this.state.currAttempt.attempt === 0 ){
      this.onNewAlert("Wow, So Smart!");
      ns.winAttempt = {
        first: this.state.winAttempt.first + 1, 
        second: this.state.winAttempt.second, 
        third: this.state.winAttempt.third, 
        fourth: this.state.winAttempt.fourth,
        winAlert: "Wow, So Smart!" };
    } else if(this.state.currAttempt.attempt === 1){
      this.onNewAlert("Amazing Job!");
      ns.winAttempt = {
        first: this.state.winAttempt.first, 
        second: this.state.winAttempt.second + 1, 
        third: this.state.winAttempt.third, 
        fourth: this.state.winAttempt.fourth,
        winAlert: "Amazing Job!" };
    }else if(this.state.currAttempt.attempt === 2){
      this.onNewAlert("Pretty Average");
      ns.winAttempt = {
        first: this.state.winAttempt.first, 
        second: this.state.winAttempt.second, 
        third: this.state.winAttempt.third + 1, 
        fourth: this.state.winAttempt.fourth,
        winAlert: "Pretty Average" };
    }else{
      this.onNewAlert("Ooo Close Call");
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


  onNewAlert = (text) =>{
    let ns = {};
    ns.activeAlert = {alert: true};
    ns.alertText = text;
    this.setState(ns);
    setTimeout(() => {
      ns.activeAlert = {alert: false};
      ns.shakeRow = false;
      this.setState(ns);
    }, 2000);

    // console.log('ALERT CHANGE', activeAlert)
  }
  
  onSelectLetter = (keyVal) => {
    let ns = {};
    if (this.state.currAttempt.letterPos > this.state.correctWord.length - 1){ console.log('Letter Pos', this.state.currAttempt.letterPos, 'Limit:', this.state.correctWord.length - 1) 
    return false;}
    if (this.state.gameOver.gameOver === true) return;
    // console.log(gameOver.gameOver, "GAME OVER")
    const newBoard = [...this.state.board]
    newBoard[this.state.currAttempt.attempt][this.state.currAttempt.letterPos] = keyVal;
    ns.board = newBoard;
    ns.currAttempt = {...this.state.currAttempt, letterPos: this.state.currAttempt.letterPos + 1};

    this.setState(ns);
  }

  onDelete = () => {
    let ns = {};
    if (this.state.currAttempt.letterPos === 0) return;
    const newBoard = [...this.state.board]
    newBoard[this.state.currAttempt.attempt][this.state.currAttempt.letterPos - 1] = "";
    ns.board = newBoard;
    ns.currAttempt = {...this.state.currAttempt, letterPos: this.state.currAttempt.letterPos - 1};

    this.setState(ns);
  }
  validateBoard = () => {
    // console.log(board, boardValidationGrid);
    let ns = {};
    let newValBoard = [...this.state.boardValidationGrid];
    const disabledLettersArray = []
    const lowerCorrectWord = this.state.correctWord.toLowerCase();
    this.state.board.map((item,index) => {
      //first create the "unclaimed" object to track how many instances of each letter in the correct word are available
      // e.g.  "books" = {b:1,o:2,k:1,s:1}
      const unclaimed = {};
      Array.from(lowerCorrectWord).map(ltr => {
        if(unclaimed[ltr]){
          unclaimed[ltr]++;
          return;
        }
        unclaimed[ltr] = 1;
      });
      // console.log('UNCLAIMED',unclaimed);
      Promise.all(
        //then check for letters exactly in the right place and make them green and claim them.
        item.map((ltr, i ) => {
          ltr = ltr.toLowerCase();
          if(ltr === ""){
            return null;
          }
          if(ltr === lowerCorrectWord[i]){
            newValBoard[index][i] = "🟩";
            unclaimed[ltr]--;
            return null;
          }
          return null;
        })
      ).then(
        //then check for correct letters in the wrong position, if those letters are still "unclaimed" make them yellow and claim them. otherwise black
        item.map((ltr, i ) => {
          ltr = ltr.toLowerCase();
          if(ltr === ""){
            return null;
          }
          if(lowerCorrectWord.indexOf(ltr) > -1 && unclaimed[ltr] > 0 && ltr !== lowerCorrectWord[i]){
            newValBoard[index][i] = "🟧";
            unclaimed[ltr]--;
            return null;
          }
          if(ltr !== lowerCorrectWord[i]){
            newValBoard[index][i] = "⬛";
          }
          if(unclaimed[ltr] === undefined){
            disabledLettersArray.push(ltr);
          }
          return null;
        })
      ).then(
        () => {
          // console.log("VALIDATION BOARD 🟧",newValBoard)
          // console.log('UNCLAIMED 🟧', unclaimed);
          ns.boardValidationGrid = newValBoard;
          ns.disabledLetters = disabledLettersArray;
          // console.log('disabled letters', this.state.disabledLetters, 'disabled letters array', disabledLettersArray)
          this.setState(ns);
          return null;
        }
      )

      return null;
    });

    //console.log(boardValidationGrid)
  }
  toggleMode = () => {
    let newMode = "light";
    if(this.state.mode === 'light'){
      newMode = "dark";
    }
    
    this.setState({mode: newMode});
    console.log(this.state.mode);
  }

  toggleContrast = () => {
    let newContrast = "nocontrast";
    if(this.state.contrast === 'nocontrast'){
      newContrast = "contrast";
    }
    
    this.setState({contrast: newContrast});
    console.log(this.state.constrast);
  }
  
  onEnter = () => {
    //console.log('LAST LETTER POS', this.state.correctWord.length, 'LETTER POS', this.state.currAttempt.letterPos)

    let ns = {};

    if (this.state.currAttempt.letterPos !== this.state.correctWord.length){
      // console.log('NOT ENOUGH LETTERS');
      this.onNewAlert("Not enough letters");
      ns.shakeRow = true;
      console.log(ns.shakeRow);
      this.setState(ns);
      return;
    }
    
    let currWord = "";

    for(let i = 0; i < this.state.correctWord.length; i++){
      currWord += this.state.board[this.state.currAttempt.attempt][i];
    }
    if (this.state.wordSet.includes(currWord.toLowerCase())) {
      ns.currAttempt = {attempt: this.state.currAttempt.attempt + 1, letterPos: 0};
      this.setState(ns);
      // console.log('WRONG WORD');
    } else if (!this.state.wordSet.includes(currWord.toLowerCase())){
      // console.log('WORD NOT FOUND');
      this.onNewAlert("Word Not Found");
      ns.shakeRow = true;
      this.setState(ns);
      return;
    }

    this.validateBoard();
    //console.log('Curr Word:', currWord.toLowerCase(), 'WORD SET:', this.state.wordSet, 'Correct Word:', this.state.correctWord.toLowerCase(), 'Is In Word Bank', this.state.wordSet.includes(currWord.toLowerCase()))

    
    ns.attempt = {...this.state.attempt}
    //SAVING ATTEMPT VALUES
    if(this.state.currAttempt.attempt === 0 ){
      ns.attempt.try1 = currWord;
    } else if(this.state.currAttempt.attempt === 1){
      ns.attempt.try2 = currWord;
    }else if(this.state.currAttempt.attempt === 2){
      ns.attempt.try3 = currWord;
    }else{
      ns.attempt.try4 = currWord;
    }

    const newBoard = [
      Array.from(ns.attempt.try1),
      Array.from(ns.attempt.try2),
      Array.from(ns.attempt.try3),
      Array.from(ns.attempt.try4)
    ]

    ns.board = newBoard;
    this.setState(ns);

    if (currWord.toLowerCase() === this.state.correctWord.toLowerCase()){
      // console.log('got',wins);
      // console.log('CORRECT WORD')
      if(!this.state.wins.includes(this.state.correctWord)){
        this.winAttemptCount();
        setTimeout(() => {
          ns.gameOver = {gameOver: true, guessedWord: true};
          this.setState(ns);
        }, 3000);

        ns.wins = [...this.state.wins, this.state.correctWord];
        ns.played = [...this.state.played, this.state.correctWord];
      } else {
        // console.log('you already guessed this riddle');
        setTimeout(() => {
          ns.gameOver = {gameOver: true, guessedWord: true};
          this.setState(ns);
        }, 3000);
      }
      this.setState(ns);
      return;
    }


    if (this.state.currAttempt.attempt === 3){
      this.onNewAlert("Get Wrecked!");
      setTimeout(() => {
        ns.gameOver = {gameOver: true, guessedWord: false};
        this.setState(ns);
      }, 3000);
      // console.log('save joined',joined);

      ns.played = [...this.state.played, this.state.correctWord];
      // console.log("Win Attempt", currAttempt.attempt)
      // setGamesLostTotal({lost: gamesLostTotal.lost + 1 }) 
    }
     


  };


  render(){
    //console.log('WINS LENGTH: ', this.state.wins.length, this.state.wins);
    const publicMethods = {
      onSelectLetter: this.onSelectLetter,
      onEnter: this.onEnter,
      onDelete: this.onDelete,
      setContext: this.setContext,
      toggleMode: this.toggleMode,
      toggleContrast: this.toggleContrast,
      onNewAlert: this.onNewAlert,
      shareGrid: this.state.boardValidationGrid
    }
    return (
      <AppContext.Provider value={{...this.state, ...publicMethods}}>
        <div className={`app ${this.state.mode} ${this.state.contrast}`}>
          <nav>
            <h1>Riddl</h1>
            <div className="statsBtn">
              <Statistics 
                  gamesPlayed={this.state.played.length} 
                  gamesWon={this.state.wins.length} 
                  firstAttempt={this.state.winAttempt.first}
                  secAttempt={this.state.winAttempt.second}
                  thirdAttempt={this.state.winAttempt.third}
                  fourthAttempt={this.state.winAttempt.fourth} 
                />
              <Settings toggleMode={this.toggleMode} mode={this.state.mode} toggleContrast={this.toggleContrast} contrast={this.state.contrast}/>
              <Info />
            </div>
          </nav>
            <div className="game">
              <Alert status={this.state.activeAlert.alert} text={this.state.alertText}/>
              <h2 className='question'>{this.state.question}</h2>
              <Board word={this.state.correctWord} alert={this.state.activeAlert.alert}/>
              <Keyboard />
              {this.state.gameOver.gameOver ? 
                <GameOver 
                  shareGrid={this.state.boardValidationGrid}
                  gamesPlayed={this.state.played.length} 
                  gamesWon={this.state.wins.length} 
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
