import React from 'react';
import Letter from './Letter';




function Board(props) {
    const wordLength = props.word.length;
    return (
        <div className="board">
            <div className="gameRow">

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
            <div className="gameRow">
                {[...Array(wordLength)].map(
                    (item, index) => (
                    <Letter key={`at2-${index}`} id={index} letterPos={index} attemptVal={1} />
                    )
                )}
            </div>
            <div className="gameRow">
                {[...Array(wordLength)].map(
                    (item, index) => (
                    <Letter key={`at3-${index}`} id={index} letterPos={index} attemptVal={2} />
                    )
                )}
            </div>
             <div className="gameRow">
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
