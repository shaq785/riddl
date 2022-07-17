import React, { useContext } from 'react';
import { AppContext } from '../App';

function Key({keyVal, bigKey, disabled}) {
    const {onSelectLetter, onDelete, onEnter} = useContext(AppContext);
    const selectLetter = () => {
        if (keyVal === "ENT"){
            onEnter();
        } else if(keyVal === "DEL"){
            onDelete();
        } else{
            onSelectLetter(keyVal);
        }
    }
    return (
        <div className="key" id={bigKey ? "big" : disabled && "disabled"} onClick={selectLetter}>
            {keyVal}
        </div>
    )
}

export default Key
