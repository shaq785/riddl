import React, {useContext, useState} from 'react'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Modal from 'react-bootstrap/Modal'

function Alert() {


    return (
        <div className="onOrientation">
            <h1>Wrong Way!</h1>

            <p>Please rotate your device to portrait</p>
        </div>

    )
}

export default Alert
