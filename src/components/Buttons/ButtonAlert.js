import React from 'react';

const ButtonAlert = ({message, action , hide, className  }) => {

    return (
        <div 
            className={"btn-alert-container btn-not-pressed "+className}
        >
            <span className = {"btn-alert-text"}> {message} </span>
            <div  className = {"btn-alert-option-container"}>
                <button
                    className="btn-alert-option btn-not-pressed"
                    onClick={() => { action(); hide(); }}>
                    SI
                </button>
                <button
                    className="btn-alert-option btn-not-pressed"
                    onClick={() => { hide(); }}>
                    NO
                </button>
            </div>
        </div>
    );
};


export default ButtonAlert;