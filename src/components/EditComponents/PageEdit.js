import React, { useState } from 'react';

import { ACTIONS_PAGE } from '../ReducersComponents/PageReducer';

import InputEdit from './InputEdit';

import '../../styles/page.scss';
import ButtonConfigComponent from '../Buttons/ButtonConfigComponent';

import PageAction from '../ActionComponents/PageAction';
import CategoriesEdit from './CategoriesEdit';
import ButtonViewMore from '../Buttons/ButtonViewMore';

const PageEdit = function ({ page, element, cantElements, parentAction }) {

    const existsAnyCategory = page && page?.categories && Array.isArray(page.categories) && page.categories.length > 0;

    const [pageAction, setPageAction] = useState(null);
    const [showPage, setShowPage] = useState(false);

    return (
        <div id={'page' + element.index} className={"page " /*+ (show ? "page-show" : "page-hide")*/}>

            <PageAction setAction={setPageAction} />

            <div className={"page-tittle-container"}>
                <span className="index-page"> Pagina {element.index + 1}/{cantElements}</span>
                <ButtonConfigComponent
                    indexElement = {element.index}
                    actionElement={element.parent}
                    actionComponent={parentAction}
                    messageAlert={"¿Desea eliminar esta página?"}
                    cantElements={cantElements}
                />
                <ButtonViewMore className="view-more boton-not-pressed" show={showPage} setShow={setShowPage} />
                <InputEdit
                    text={page?.tittle}
                    className="page-tittle-edit"
                    containerClassName="page-tittle-container-input"
                    action={{
                        type: ACTIONS_PAGE.CHANGE_TITTLE,
                        payload: { element: element }
                    }}
                />
            </div>

            {showPage && <div className={"add-container"} >

                <div className={"add-component"}>
                    <ButtonConfigComponent indexElement={page?.categories?.length} actionElement={element} actionComponent={pageAction} />
                    <span className="add-text">Añadir Categoria</span>
                </div >
            </div>}

            {existsAnyCategory && showPage && <CategoriesEdit parentElement={element} categories={page.categories} parentAction={pageAction} />}
        </div >
    );
};


export default PageEdit;