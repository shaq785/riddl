import React, {useContext} from 'react';
import { AppContext } from '../App';

  
function Alert(props) {
    const {activeAlert} = useContext(AppContext);
    const newAlert = (activeAlert.alert ? 'active' : '');
    console.log('NEW ALERT', newAlert)
    return (
        <div>
            <p  className={newAlert + " alert"}>{props.text}</p>
        </div>

    )
}

export default Alert

