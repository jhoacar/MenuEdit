import React, { useState } from 'react';
import { connect } from 'react-redux';

import '../../styles/menu.scss'
import '../../styles/button.scss';
import ButtonConfigComponent from '../Buttons/ButtonConfigComponent';
import ButtonSaveAll from '../Buttons/ButtonSaveAll';
import { MENU } from '../GetComponents/Constants';
//import ButtonChangePage from '../Buttons/ButtonChangePage';

import PagesEdit from './PagesEdit';

import  MenuAction from '../ActionComponents/MenuAction';
//import { changeStylesPageNext, changeStylesPagePrev } from '../ActionComponents/MenuAction';

const MenuEdit = function ({ pages, actualPage }) {

    const [menuAction, setMenuAction] = useState(null);

    const existsAnyPage = pages && Array.isArray(pages) && pages.length > 0;
    //const existsPages = existsAnyPage && pages.length > 1;

    return (
        <div className="menu">

            <MenuAction setAction={setMenuAction} />
            
            {(!Array.isArray(pages) || pages.length < 1) &&
                <span className="waiting-text">
                    No hay Paginas
                    <strong>(Añada una nueva)</strong>
                </span>}

            {/*existsPages && <ButtonChangePage
                changeNextStyles={()=>changeStylesPageNext(actualPage)}
                changePrevStyles={()=>changeStylesPagePrev(actualPage)}
            />*/}

            {!existsAnyPage &&
                <div style={{ position: 'absolute', left: '50%', top: '0', zIndex: '2' }}>
                    <ButtonConfigComponent indexElement={0} actionElement={{ name: MENU }} actionComponent={menuAction} />
                </div>
            }

            {existsAnyPage &&
                <>
                    {/* <span className="show-page-info"> PAGINA {actualPage + 1} - {pages.length}</span> */}
                    <PagesEdit parentElement={{name:MENU}} pages={pages} parentAction={menuAction} actualPage={actualPage} />
                    <ButtonSaveAll />
                </>
            }
        </div>
    )
};

const mapStateToProps = state => ({
    pages: state?.pages,
    actualPage: state?.actualPage
})

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MenuEdit);