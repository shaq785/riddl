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
            <Button variant="" className="statsBtn" onClick={handleShow}>
                <img src="/images/stats.svg" alt=""/>
                <span className="sr-only">Statistics</span>
            </Button>
            <Modal 
                className="statistics"
                show={show}
                backdrop="static"
                keyboard={false}
            >
                    <Modal.Header>
                        <h1>Statistics</h1>
                        <CloseButton variant="white" onClick={handleClose} />
                        <Row>
                            <Col>
                                <p><span className="d-block">{props.gamesPlayed}</span> Played</p>
                            </Col>
                            <Col>
                                <p><span className="d-block">{winPerWhole > 0 ? winPerWhole : '0'}%</span> Win %</p>
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
                    <Modal.Footer>
                        <h4>Next Riddl:</h4>
                        <Timer />
                    </Modal.Footer>
            </Modal>
        </ThemeProvider>
    )
}

export default Statistics
