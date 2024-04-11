import React, {useContext, useState} from 'react'
import { AppContext } from '../App'
import Button from 'react-bootstrap/Button';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
// import dateFormat from 'dateformat';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';



  

function Settings(props) {
    const {onNewAlert} = useContext(AppContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const shareHelper = () => {
        //let shareText = "";
        const loc = "www.riddl.us";
        return <div>
                <p><span>{loc}</span></p>
            </div>
    }

    const handleShareClick = () => {
        let range = document.createRange();
        range.selectNode(document.getElementById("share-text"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        onNewAlert('Copied link to clipboard')
    }

    return (
        <ThemeProvider>
            <Button variant=""  onClick={handleShow}>
                <img src="images/info.svg" alt=""/>
                <span className="sr-only">Info</span>
            </Button>
            <Modal 
                className="how-to-play"
                show={show}
                backdrop="static"
                keyboard={false}
            >
                    <Modal.Header>
                        <h1>Riddl</h1>
                        <CloseButton variant="white" onClick={handleClose} />
                        <Row>
                            <Col><h2>How to play</h2></Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="montserrat">Guess the daily riddle within 4 tries! The game tiles will help you on your quest to ultimate riddledom.</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <img src="images/how-to-play.png" alt="" aria-describedby="gamePlayRules"/>
                                <p className="sr-only" id="gamePlayRules">Grey letter is not in the word, Green letter is both in the word and in the right place, and orange letter is in the word, but where? We're not telling.</p>
                            </Col>
                        </Row>
                        <Row className="w-100">
                            {/* <Col>
                                <p className='nowrap'>Are you a gamer? So are we!</p>
                            </Col> */}
                            <Col className="col-12 col-lg-6 mb-3 mb-lg-0">
                                <div className="share-area">
                                    <div id="share-text" className='sr-only' aria-hidden="true">
                                        {shareHelper()}
                                    </div>
                                    <Button type="primary" className="btn btn-mill" onClick={handleShareClick}>share game</Button>
                                </div>
                            </Col>
                            <Col  className="col-12 col-lg-6">
                                <a href="/millennium25th/wargames" target="_blank" className="btn btn-mill">visit the Millennium arcade</a>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <div className="share-area">
                                    <div id="share-text" className='sr-only' aria-hidden="true">
                                        {shareHelper()}
                                    </div>
                                    <Button type="primary" className="btn btn-mill" onClick={handleShareClick}>share game</Button>
                                </div>
                            </Col>
                        </Row> */}
                    </Modal.Header>
                    <Modal.Footer>
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

export default Settings
