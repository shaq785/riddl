import React, {useContext, useState} from 'react'
import { AppContext } from '../App'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Timer from './Timer';
import dateFormat from 'dateformat';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';



  

function GameOver(props) {
    const {gameOver, currAttempt, correctWord} = useContext(AppContext)
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const winPer = ((props.gamesWon) / (props.gamesPlayed)) * 100;
    const winPerWhole = Math.round(winPer);


    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    var nextDay = year + "-" + month + "-" + day
    var nextDayFormat = dateFormat(nextDay, "mmmm, dd, yyyy");
    
    
    return (
        <ThemeProvider>
            <Modal 
                className="gameover"
                show={show}
                backdrop="static"
                keyboard={false}
            >
                    <Modal.Header>
                        <h1>{gameOver.guessedWord ? props.winAlert : "Get Wrecked"}</h1>
                        <CloseButton variant="white" onClick={handleClose} />
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
                    <Modal.Footer>
                        <h4>Next Riddl:</h4>
                        <Timer deadline={nextDayFormat} />
                    </Modal.Footer>
            </Modal>
        </ThemeProvider>
    )
}

export default GameOver
