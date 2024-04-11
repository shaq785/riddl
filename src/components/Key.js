import React, { useContext } from 'react';
import { AppContext } from '../App';

function Key({keyVal, bigKey, disabled}) {
    const {onSelectLetter, onDelete, onEnter} = useContext(AppContext);

    //console.log('KEY DISABLED', keyVal, disabled)
    const selectLetter = () => {
        if (keyVal === "ENT"){
            onEnter();
        } else if(keyVal === "DEL"){
            onDelete();
        } else{
            onSelectLetter(keyVal);
        }
    }
    let keyClass = "";
    if(bigKey){ keyClass = "big" }
    if(disabled){ keyClass = "disabled" }
    //console.log('!!!KEY VARS',keyVal,bigKey,disabled,keyClass);
    return (
        <button className={`key key-${keyVal} ${keyClass}`} onClick={selectLetter}>
            {keyVal}
        </button>
    )
}

export default Key
