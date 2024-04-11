import React, {useContext, useState} from 'react'
import { AppContext } from '../App'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Timer from './Timer';
// import dateFormat from 'dateformat';
// import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import AttempBar from './attemptBar';
import Share from "./Share";



  

function GameOver(props) {
    const {gameOver, currAttempt, correctWord} = useContext(AppContext)
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const winPer = ((props.gamesWon) / (props.gamesPlayed)) * 100;
    const winPerWhole = Math.round(winPer);

    const totalWinAttempts = props.firstAttempt + props.secAttempt + props.thirdAttempt + props.fourthAttempt;

    // const shareHelper = () => {
    //     //let shareText = "";
    //     const dt = new Date().toDateString();
    //     const loc = "www.riddl.us";
    //     const shr = props.shareGrid.map((item,i) => {
    //         if (item[0].length === 0) return null;
    //         return <span key={i}><br/>{`${item.join('')}`}</span>;
    //         //return null;
    //     });
        
    //     return <div>
    //             <p>Riddl: {dt}</p>
    //             {shr}
    //             <p class="mt-3 sr-only">Play now: {loc}</p>
    //         </div>
    // }
    // const handleShareClick = () => {
    //     let range = document.createRange();
    //     range.selectNode(document.getElementById("share-text"));
    //     window.getSelection().removeAllRanges(); // clear current selection
    //     window.getSelection().addRange(range); // to select text
    //     document.execCommand("copy");
    //     window.getSelection().removeAllRanges();// to deselect
    //     console.log('COPIED')
    //     onNewAlert('Copied results to clipboard')
    // }
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
                        <h1>Riddl</h1>
                        <CloseButton variant="white" onClick={handleClose} />
                        <Row>
                            <Col><h2>Statistics</h2></Col>
                        </Row>
                        <Row className='winStats'>
                            <Col className='gamesPlayed'>
                                <p><span>{props.gamesPlayed}</span></p> 
                                <p>games played</p>
                            </Col>
                            <Col className='winPer'>
                                <p><span>{winPerWhole > 0 ? winPerWhole : '0'}%</span></p> 
                                <p>of games won</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col><h2>Guess Distribution</h2></Col>
                        </Row>
                        <Row className="flex-col chart">
                            <Col><p>1 try</p> <AttempBar amount={props.firstAttempt} total={totalWinAttempts} /></Col>
                            <Col><p>2 tries</p> <AttempBar amount={props.secAttempt} total={totalWinAttempts}/></Col>
                            <Col><p>3 tries</p> <AttempBar amount={props.thirdAttempt} total={totalWinAttempts} /></Col>
                            <Col><p>4 tries</p> <AttempBar amount={props.fourthAttempt} total={totalWinAttempts} /></Col>
                        </Row>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col><h2>{gameOver.guessedWord ? props.winAlert : "Get Wrecked"}</h2></Col>
                        </Row>
                        <Row className='gameResults'>
                            <Col className='correctWord'>
                                <p><span>{correctWord}</span></p>
                                <p>correct answer</p>
                            </Col>
                            <Col className="gameAttempt">
                                <div className="attemptCount">
                                    {gameOver.guessedWord && currAttempt.attempt > 0 && (<p><span className="">{currAttempt.attempt}</span></p>)}
                                    {gameOver.guessedWord && currAttempt.attempt > 0 && gameOver.guessedWord && currAttempt.attempt < 2 && (<p>try</p>)}
                                    {gameOver.guessedWord && currAttempt.attempt > 1 && (<p>tries</p>)}
                                </div>
                                <div className="share-area">
                                    <Share
                                        label="share game"
                                    />
                                    {/* <Button type="primary" onClick={handleShareClick} >share game</Button> */}
                                </div>
                            </Col>
                        </Row>
                        
                       
                        <Row>
                            
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <h2>Play next Riddl in</h2>
                        <Timer />
                        <Row>
                            <Col>
                                <div className='made-by'>
                                    <p>made by</p> 
                                    <img src="images/mill-logo.png" alt="Millennium"/> 
                                </div>
                            </Col>
                        </Row>
                    </Modal.Footer>
            </Modal>
        </ThemeProvider>
    )
}

export default GameOver
