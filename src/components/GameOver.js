import React, {useContext, useState} from 'react'
import { AppContext } from '../App'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


  

function GameOver(props) {
    const {gameOver, gamesPlayedTotal, gamesWonTotal, gamesLostTotal, currAttempt, correctWord} = useContext(AppContext)
    const [show, setShow] = useState(true);

    const winPer = ((props.gamesWon) / (props.gamesPlayed)) * 100;
    const winPerWhole = Math.round(winPer);

    return (
        <ThemeProvider>
            <Modal 
                className="gameover"
                show={show}
                backdrop="static"
                keyboard={false}
            >
                    <Modal.Header>
                        <h1>{gameOver.guessedWord ? props.winAlert : "Better Luck Next Time"}</h1>
                        <Row>
                            <Col>
                                <p><span className="d-block">{props.gamesPlayed}</span> Played</p>
                            </Col>
                            <Col>
                                <p><span className="d-block">{winPerWhole}%</span> Win %</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>Guess Distribution</Col>
                        </Row>
                        <Row className="flex-col">
                            <Col>1: {props.firstAttempt}</Col>
                            <Col>2: {props.secAttempt}</Col>
                            <Col>3: {props.thirdAttempt}</Col>
                            <Col>4: {props.fourthAttempt}</Col>
                        </Row>
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
