import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';

function Letter({letterPos, attemptVal, id}) {
    const { board ,boardValidationGrid, correctWord, currAttempt, disabledLetters, setContext} = useContext(AppContext);
    const letter = board[attemptVal][letterPos];
    const emoji = boardValidationGrid[attemptVal][letterPos];
    const correct = emoji === "🟩";
    const almost = emoji === "🟧";
    //console.log(emoji, letter);

    const letterState = currAttempt.attempt > attemptVal &&
     (correct ? "correct" : almost ? "almost" : "incorrect");

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
            setContext({disabledLetters: [...disabledLetters, letter]});
            //setDisabledLetters((prev) => [...prev, letter]);
         }
     }, [currAttempt.attempt]);
    //console.log('letter state',letterState); 
    return (
        <div className={`letter ${letterState || ""}`} id={id}>
            {""}
            {letter}
            <p className="sr-only">{letterState}</p>
        </div>
    )
}

export default Letter
