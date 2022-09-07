import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';

function Letter({letterPos, attemptVal, id}) {
    const { board, correctWord, currAttempt, setDisabledLetters} = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = correctWord.toUpperCase()[letterPos] === letter;
    const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
    

    const letterState = currAttempt.attempt > attemptVal &&
     (correct ? "correct" : almost ? "almost" : "error");
    //setBoardValidation(boardValidation);
    //const valBoard = [[...boardValidation[0]],[...boardValidation[1]],[...boardValidation[2]],[...boardValidation[3]]];
    //valBoard.push(['hi']);
    //console.log(valBoard[attemptVal]);
        //console.log(boardValidation);  
    // if (letterState){
    //     boardValidation[attemptVal][letterPos] = correct ? "correct" : almost ? "almost" : "error";
    // } 
     useEffect(() => {
         if(letter !== "" && !correct && !almost){
             setDisabledLetters((prev) => [...prev, letter]);
         }
     }, [currAttempt.attempt]);
    //console.log('letter state',letterState); 
    return (
        <div className={`letter ${letterState || ""}`} id={id}>
            {""}
            {letter}
        </div>
    )
}

export default Letter
