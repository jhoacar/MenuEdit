import React, {  useRef } from 'react';
import { ImArrowRight } from 'react-icons/im';
import { ImArrowLeft } from 'react-icons/im';
import { connect } from 'react-redux';
import { ACTIONS_MENU } from '../ReducersComponents/MenuReducer';
import { MENU } from '../GetComponents/Constants';



const ButtonChangePage = ({ maxElements, actualPage, changeNextStyles,
    changePrevStyles, nextPage, prevPage, sizeButton = 20 }) => {

    const refNext = useRef(null);
    const refPrev = useRef(null);
    const existsRight = actualPage !== maxElements - 1;
    const existsLeft = actualPage !== 0;

    const nextElement = () => {

        if (refNext && refPrev) {
            refPrev.current.style.opacity = 1;
            refPrev.current.style.zIndex = 10 * (maxElements + 1);
        }
        if (refNext && refPrev && actualPage === maxElements - 2) {
            refNext.current.style.opacity = 0;
            refNext.current.style.zIndex = -1;
        }
        changeNextStyles();
        nextPage();
    }

    const prevElement = () => {

        if (refNext && refPrev) {
            refNext.current.style.opacity = 1;
            refNext.current.style.zIndex = 10 * (maxElements + 1);
        }
        if (refPrev && refNext && actualPage === 1) {
            refPrev.current.style.opacity = 0;
            refPrev.current.style.zIndex = -1;
        }
        changePrevStyles();
        prevPage();
    }
    // eslint-disable-next-line
    const loadKeyListener = () => {
        document.addEventListener('keydown', event => {
            if(event.key==="ArrowRight")
                nextElement()
            else if(event.key==="ArrowLeft")
                prevElement()
        })
    }


    return (
        <div className="container-btn">
            <button className="btn-change-page btn-not-pressed"
                ref={refNext}
                style={{
                    right: 0,
                    zIndex: existsRight ? 10 * (maxElements + 1) : -1,
                    opacity: existsRight ? 1 : 0
                }}
                onClick={nextElement}>
                <ImArrowRight size={sizeButton} />
            </button>
            <button className="btn-change-page btn-not-pressed"
                ref={refPrev}
                style={{
                    left: 0,
                    zIndex: existsLeft ? 10 * (maxElements + 1) : -1,
                    opacity: existsLeft ? 1 : 0
                }}
                onClick={prevElement}>
                <ImArrowLeft size={sizeButton} />
            </button>
        </div>
    );
};

const mapStateToProps = state => ({
    maxElements: state.pages.length,
    actualPage: state.actualPage
})

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
})


export default connect(mapStateToProps, mapDispatchToProps)(ButtonChangePage);