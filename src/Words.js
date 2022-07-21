import wordBank from './wordle-bank.txt';
import Riddles from './Riddles.json';
// import Timer from './components/Timer';
// import dateFormat from 'dateformat';



export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
]



export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    let todaysRiddle;
    let todaysQuestion;
    let todaysAnswer;
    
    // await fetch(wordBank)
    //     .then((response) => response.text())
    //     .then((result) => {
    //         const wordArr = result.split("\n")
    //         console.log(result, 'RESULT');
    //         todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
    //         wordSet = new Set(wordArr);
    //     });
    


    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split("\n");
            const riddleId = Riddles[Math.floor(Math.random()*Riddles.length)];
            wordSet = new Set(wordArr);
            todaysRiddle = riddleId;
            todaysQuestion = todaysRiddle.question;
            todaysAnswer = todaysRiddle.answer;
        });

    return {wordSet, todaysWord, todaysQuestion, todaysAnswer};
};