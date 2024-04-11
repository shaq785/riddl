import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Timer from './Timer';
// import dateFormat from 'dateformat';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import AttempBar from './attemptBar';



  

function Statistics(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //console.log(props.gamesWon);
    const winPer = ((props.gamesWon) / (props.gamesPlayed)) * 100;
    const winPerWhole = Math.round(winPer);


    // console.log(winPerWhole)
    // console.log(winPerWhole > 0 ? winPerWhole : '0', 'Win %')

    const totalWinAttempts = props.firstAttempt + props.secAttempt + props.thirdAttempt + props.fourthAttempt;


    // var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    // var day = currentDate.getDate()
    // var month = currentDate.getMonth() + 1
    // var year = currentDate.getFullYear()
    // var nextDay = year + "-" + month + "-" + day
    // var nextDayFormat = dateFormat(nextDay, "mmmm, dd, yyyy");
    
    
    return (
        <ThemeProvider>
            <Button variant=""  onClick={handleShow}>
                <img src="images/stats.svg" alt=""/>
                <span className="sr-only">Statistics</span>
            </Button>
            <Modal 
                className="statistics"
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

export default Statistics
