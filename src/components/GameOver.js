import React, {useContext, useState} from 'react'
import { AppContext } from '../App'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Modal from 'react-bootstrap/Modal'

function GameOver() {
    const {gameOver, gamesPlayedTotal, gamesWonTotal, gamesLostTotal, currAttempt, correctWord} = useContext(AppContext)
    const [show, setShow] = useState(true);


    return (
        <ThemeProvider>
            <Modal 
                className="gameover"
                show={show}
                backdrop="static"
                keyboard={false}
            >
                    <Modal.Header>
                        <h1>{gameOver.guessedWord ? "You Got It!" : "Better Luck Next Time"}</h1>
                        <p>Games Played: {gamesPlayedTotal}</p>
                        <p>Total Wins: {gamesWonTotal} </p>
                        <p>Total Losses: {gamesLostTotal} </p>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>
                            <span>Correct Answer:</span> {correctWord}
                        </h3>
                        {gameOver.guessedWord && (<p> You guessed in {currAttempt.attempt} attempt(s).</p>)}
                    </Modal.Body>
            </Modal>
        </ThemeProvider>
    )
}

export default GameOver
