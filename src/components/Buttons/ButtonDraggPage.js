import React, { useState } from 'react';
import { ACTIONS_MENU } from '../ReducersComponents/MenuReducer';
import { MENU } from '../Constants';
import { connect } from 'react-redux';

const RightDirection = 1;
const LeftDirection = 0;
const NoDirection = -1;


const ButtonDraggPage = ({ maxElements, actualPage, changeNextStyles,
    changePrevStyles, nextPage, prevPage }) => {

    const [direction, setDirection] = useState(NoDirection);
    const [changePage, setChange] = useState(false);
    const dragStart = function (clientX) {

        setChange(true);

        if (clientX >= 0.9 && clientX <= 1 && direction === NoDirection)
            setDirection(LeftDirection); // 1 para indicar que se selecciono la parte derecha de la pantalla
        else if (clientX >=0 && clientX <= 0.1 && direction === NoDirection)
            setDirection(RightDirection); // 0 para indicar que se selecciono la parte izquierda de la pantalla
        else
            setDirection(NoDirection); //-1 para indicar que no se ha escogido un lugar clave para realizar cambio de pagina
    }
    const dragging = function (clientX) {

        const $actualPage = document.getElementById('page' + actualPage);

        if (!$actualPage) return;

        if (direction === LeftDirection) { //Next Page
            if (clientX < 0.99 && changePage) {
                changeNextStyles();
                setChange(false);
                setDirection(NoDirection);
                nextPage();
            }
        }
        else if (direction === RightDirection) { //Prev Page
            if (clientX > 0.01 && changePage) {
                changePrevStyles();
                setChange(false);
                setDirection(NoDirection);
                prevPage();
            }
        }

    }

    return (
        <>
            <div
                onPointerEnter={e => { dragStart(e.clientX / window.innerWidth) }}
                onPointerMove={e => { dragging(e.clientX / window.innerWidth) }}
                style={{ 
                    position: 'fixed',
                    left:0, 
                    background: "transparent", 
                    width: "8vw", 
                    height: "100vh", 
                    zIndex: 10 * (maxElements) }}
            >
            </div>
            <div
                onPointerEnter={e => { dragStart(e.clientX / window.innerWidth) }}
                onPointerMove={e => { dragging(e.clientX / window.innerWidth) }}
                style={{ 
                    position: 'fixed',
                    right:0, 
                    background: "transparent",
                     width: "8vw", 
                     height: "100vh", 
                     zIndex: 10 * (maxElements) }}
            >
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    actualPage: state?.actualPage,
    maxElements: state?.pages.length
});

const mapDispatchToProps = dispatch => ({
    nextPage() {
        dispatch({
            type: ACTIONS_MENU.NEXT_PAGE,
            payload: { element: { name: MENU } }
        });
    },
    prevPage() {
        dispatch({
            type: ACTIONS_MENU.PREV_PAGE,
            payload: { element: { name: MENU } }
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonDraggPage);

