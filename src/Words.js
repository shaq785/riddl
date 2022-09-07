import wordBank from './wordle-bank.txt';
import Riddles from './Riddles.json';
// import Timer from './components/Timer';
// import dateFormat from 'dateformat';



export const boardDefault = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
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
    
    // ==============================
    // Date logic:
    // Get todays date and calc the number of days since our origin date (arbitrary past date)
    // use that number to pick the riddle
    // Set riddleIndexOverride to a number to load a specific riddle, or false for riddle of the day
    // ==============================
    const riddleIndexOverride = false;
    let today = new Date(),
        dd = String(today.getDate()).padStart(2, '0'),
        mm = String(today.getMonth() + 1).padStart(2, '0'), //January is 0!
        yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd; 
    const todayDate = new Date(today);
    const originDate = new Date('2022-08-01');
    let dateDiff = todayDate - originDate;
    let dayNumber = riddleIndexOverride ? riddleIndexOverride : dateDiff / (24*60*60*1000);


    //If 
    while (dayNumber >= Riddles.length){
        dayNumber = dayNumber - Riddles.length;
    }

    // console.log('Difference between the origin date and todays date:',originDate.toUTCString(),todayDate.toUTCString(),dayNumber);
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split("\n");
            //const riddleId = Riddles[Math.floor(Math.random()*Riddles.length)];
            const ren = str => str.replace(/[a-zA-Z]/g,function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);});
            const newRiddles = []
            Riddles.map((item, index) => {
                const newItem = {
                    question: ren(item.question),
                    answer: ren(item.answer),
                    id: item.id
                }
                //console.log(newItem);
                newRiddles.push(newItem);
            })

            const riddleId = newRiddles[dayNumber];
            wordSet = new Set(wordArr);
            todaysRiddle = riddleId;
            todaysQuestion = todaysRiddle.question;
            todaysAnswer = todaysRiddle.answer;
            // console.log(todaysAnswer);
        });

    return {wordSet, todaysWord, todaysQuestion, todaysAnswer};
};