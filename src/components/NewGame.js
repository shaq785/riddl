
import {useState} from 'react'
import dateFormat from 'dateformat';


export const generateNewGame = () => {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var nextDayFormat = dateFormat(currentDate, "mmmm, dd, yyyy");
    var todaysDate = new Date();
    var todaysDateFormat = dateFormat(todaysDate, "mmmm, dd, yyyy");
    const [riddleIdVal, setRiddleIdVal] = useState({riddleIdVal: 0});
    
    if(todaysDateFormat === nextDayFormat && riddleIdVal < 44){
        setRiddleIdVal({ riddleIdVal: riddleIdVal + 1} );
    } else{
        setRiddleIdVal({ riddleIdVal: 0 });
    }
    

    return {riddleIdVal}

}

