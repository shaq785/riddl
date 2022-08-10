import React from 'react'

function AttemptBar(props) {
    console.log(props.amount/props.total * 100);
    const colWidth = props.amount/props.total * 100;
    return (
        <span className="bar" style={{width: colWidth + '%'}}>
            <span>{props.amount}</span>
        </span>
    )
}

export default AttemptBar