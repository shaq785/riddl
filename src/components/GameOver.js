import React, {useContext, useState} from 'react'
import { AppContext } from '../App'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Timer from './Timer';
// import dateFormat from 'dateformat';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import AttempBar from './attemptBar';



  

function GameOver(props) {
    const {gameOver, currAttempt, correctWord} = useContext(AppContext)
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const winPer = ((props.gamesWon) / (props.gamesPlayed)) * 100;
    const winPerWhole = Math.round(winPer);

    const totalWinAttempts = props.firstAttempt + props.secAttempt + props.thirdAttempt + props.fourthAttempt;

    const shareHelper = () => {
        //let shareText = "";
        const dt = new Date().toDateString();
        const loc = window.location.href;
        const shr = props.shareGrid.map((item,i) => {
            if (item[0].length === 0) return null;
            return <span key={i}><br/>{`${item.join('')}`}</span>;
            //return null;
        });
        return <div>
                <p>Riddl: {dt}<span className="sr-only">{loc}</span></p>
                {shr}
            </div>
    }
    const handleShareClick = () => {
        let range = document.createRange();
        range.selectNode(document.getElementById("share-text"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
    }
    // var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    // var day = currentDate.getDate()
    // var month = currentDate.getMonth() + 1
    // var year = currentDate.getFullYear()
    // var nextDay = year + "-" + month + "-" + day
    // var nextDayFormat = dateFormat(nextDay, "mmmm, dd, yyyy");
    
    
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
                        <Row className="flex-col chart">
                            <Col>1: <AttempBar amount={props.firstAttempt} total={totalWinAttempts} /></Col>
                            <Col>2: <AttempBar amount={props.secAttempt} total={totalWinAttempts}/></Col>
                            <Col>3: <AttempBar amount={props.thirdAttempt} total={totalWinAttempts} /></Col>
                            <Col>4: <AttempBar amount={props.fourthAttempt} total={totalWinAttempts} /></Col>
                        </Row>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>
                            <span>Correct Answer:</span> {correctWord}
                        </h3>
                       {gameOver.guessedWord && currAttempt.attempt > 0 && (<p> You guessed in {currAttempt.attempt} attempt(s).</p>)}
                        <Row>
                            <Col className="share-area">
                                <div id="share-text">
                                    {shareHelper()}
                                </div>
                                <Button type="primary" onClick={handleShareClick}>Copy to clipboard</Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <h4>Next Riddl:</h4>
                        <Timer />
                    </Modal.Footer>
            </Modal>
        </ThemeProvider>
    )
}

export default GameOver
