import React, { useContext } from 'react';
import Letter from './Letter';
import { AppContext } from '../App';




function Board(props) {
    const {currAttempt, shakeRow} = useContext(AppContext);
    const wordLength = props.word.length;
    let animationRow0 = ""
    let animationRow1 = ""
    let animationRow2 = ""
    let animationRow3 = ""

    if (shakeRow && currAttempt.attempt === 0){
        animationRow0 = "shake"
    }
    if (shakeRow && currAttempt.attempt === 1){
        animationRow1 = "shake"
    }
    if (shakeRow && currAttempt.attempt === 2){
        animationRow2 = "shake"
    }
    if (shakeRow && currAttempt.attempt === 3){
        animationRow3 = "shake"
    }


    return (
        <div className="board">
            <div className={`gameRow ${animationRow0}`}>

            {[...Array(wordLength)].map(
                (item, index) => (
                <Letter key={`at1-${index}`} id={index} letterPos={index} attemptVal={0}  />
                )
            )}


                {/* <Letter letterPos={0} attemptVal={0}/>
                <Letter letterPos={1} attemptVal={0}/>
                <Letter letterPos={2} attemptVal={0}/>
                <Letter letterPos={3} attemptVal={0}/>
                <Letter letterPos={4} attemptVal={0}/> */}
            </div>
            <div className={`gameRow ${animationRow1 || ""}`}>
                {[...Array(wordLength)].map(
                    (item, index) => (
                    <Letter key={`at2-${index}`} id={index} letterPos={index} attemptVal={1} />
                    )
                )}
            </div>
            <div className={`gameRow ${animationRow2 || ""}`}>
                {[...Array(wordLength)].map(
                    (item, index) => (
                    <Letter key={`at3-${index}`} id={index} letterPos={index} attemptVal={2} />
                    )
                )}
            </div>
             <div className={`gameRow ${animationRow3 || ""}`}>
                {[...Array(wordLength)].map(
                    (item, index) => (
                    <Letter key={`at4-${index}`} id={index} letterPos={index} attemptVal={3} />
                    )
                )}  
            </div>
        </div>
    )
}

export default Board
