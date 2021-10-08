import React from 'react';
import { BiShow , BiHide} from 'react-icons/bi';

const ButtonViewMore = ({  show, setShow }) => {
    return (
        <div
            className={"btn-view-more btn-not-pressed"}
            onClick={() => { setShow(!show); }}
            style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }}
        >
            {show ? <BiHide /> : <BiShow />}
        </div>
    );
};


export default ButtonViewMore;