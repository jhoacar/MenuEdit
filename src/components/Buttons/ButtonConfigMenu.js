import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ACTIONS_MENU } from '../ReducersComponents/MenuReducer';
import { MENU } from '../Constants';
import ButtonAlert from './ButtonAlert';

const ButtonConfigMenu = ({ addPage, deletePage, movePage, maxPages, actualPage, setAlert }) => {

    const [alertDelete, setAlertDelete] = useState(false);

    return (
        <>
            <div className={"btn-config-container"} style={{ position: 'absolute', zIndex: (20 * (maxPages ? maxPages : 0 + 2)) }}>
                <button
                    style={{
                        fontFamily: "Fuente Blest Texto",
                        color: 'black',
                        fontSize: '12px',
                        height: '50px',
                        minWidth: '70px',
                        padding: '0',
                        margin: '5px 0px 10px 0px',
                        borderRadius: '10%'
                    }}
                    onClick={(e) => { addPage(); }}
                    className={"boton-not-pressed"}
                >
                    Nueva Pagina
                </button>
                {maxPages > 0 &&
                    <button
                        style={{
                            fontFamily: "Fuente Blest Texto",
                            color: 'black',
                            fontSize: '12px',
                            height: '50px',
                            minWidth: '70px',
                            padding: '0',
                            margin: '5px 0px 10px 0px',
                            borderRadius: '10%'
                        }}
                        onClick={(e) => { setAlertDelete(true) }}
                        className={"boton-not-pressed"}
                    >
                        Eliminar Pagina
                    </button>}
                {maxPages > 1 &&
                    <button
                        style={{
                            fontFamily: "Fuente Blest Texto",
                            color: 'black',
                            fontSize: '12px',
                            height: '50px',
                            minWidth: '70px',
                            padding: '0',
                            margin: '5px 0px 10px 0px',
                            borderRadius: '10%'
                        }}
                        onClick={(e) => { movePage(); }}
                        className={"boton-not-pressed"}
                    >
                        Mover Pagina
                    </button>}
            </div>
            {alertDelete &&
                <ButtonAlert message={"¿Desea eliminar esta pagina? "} action={deletePage} hide={()=>{setAlertDelete(false)}} />
            }
        </>
    );
};

const mapStateToProps = state => ({
    maxPages: state?.pages.length,
    actualPage: state?.actualPage
});

const mapDispatchToProps = dispatch => ({
    addPage() {
        dispatch({
            type: ACTIONS_MENU.ADD_PAGE,
            payload: { element: { name: MENU } }
        });
    },
    deletePage() {
        dispatch({
            type: ACTIONS_MENU.DELETE_PAGE,
            payload: { element: { name: MENU } }
        });
    },
    movePage(finalPage) {
        dispatch({
            type: ACTIONS_MENU.MOVE_PAGE,
            payload: { element: { name: MENU } }
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonConfigMenu);