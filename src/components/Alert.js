import React, {useContext} from 'react';
import { AppContext } from '../App';

  
function Alert(props) {
    const {activeAlert} = useContext(AppContext);
    const newAlert = (activeAlert.alert ? 'active alert' : 'alert');
    //console.log('NEW ALERT', newAlert)
    return (
        <div>
            <p className={newAlert}>{props.text}</p>
        </div>

    )
}

export default Alert

