import React from 'react';

const CardInfo = (props) => {
    
    return (
        <div>
            <div>
                <h1>Name: {props.name}</h1>
                <p>Age: {props.age}</p>
                <p>Count: {props.count}</p>
                <button class="btn p-2 bg-red-500" onClick={props.increment}></button>
            </div>
        </div>
    );
};

export default CardInfo;