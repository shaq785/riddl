import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
// import dateFormat from 'dateformat';
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import ToggleSwitch from './ToggleSwitch';



  

function Settings(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [darkMode, setDarkMode] = useState(false);
    const [contrastMode, setContrastMode] = useState(false);

    // const toggleCont = () => setDarkMode(prevCheck => !prevCheck); console.log(darkMode, 'Cont!')

    

    return (
        <ThemeProvider>
            <Button variant=""  onClick={handleShow}>
                <img src="images/settings.svg" alt=""/>
                <span className="sr-only">Settings</span>
            </Button>
            <Modal 
                className="settings"
                show={show}
                backdrop="static"
                keyboard={false}
            >
                    <Modal.Header>
                        <h1>Riddl</h1>
                        <CloseButton variant="white" onClick={handleClose} />
                        <Row className='toggleRow'>
                            <Col>
                                <ToggleSwitch checked={props.mode == 'dark'}label="Go Dark" onClick={() => props.toggleMode()} />
                            </Col>
                        </Row>
                        <Row className='toggleRow'>
                            <Col>
                                <ToggleSwitch checked={props.contrast == 'contrast'} label="Increase color contrast" onClick={() => props.toggleContrast()} />
                            </Col>
                        </Row>
                    </Modal.Header>
                    <Modal.Footer>
                        <Row>
                            <Col>
                                <div className='made-by'>
                                    <p>made by</p> 
                                    <img src="images/mill-logo.png" alt=""/> 
                                </div>
                            </Col>
                        </Row>
                    </Modal.Footer>
            </Modal>
        </ThemeProvider>
    )
}

export default Settings
