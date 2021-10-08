import React, { useState } from 'react'

import ImagesEdit from './ImagesEdit';
import InputEdit from './InputEdit';

import { ACTIONS_PRODUCT } from '../ReducersComponents/ProductReducer'

import ButtonViewMore from '../Buttons/ButtonViewMore';
import ButtonConfigComponent from '../Buttons/ButtonConfigComponent';
import TittleProductEdit from './TittleProductEdit';
import ProductAction from '../ActionComponents/ProductAction';
import PricesEdit from './PricesEdit';
import { DESCRIPTION, DETAILS, PRICES } from '../GetComponents/Constants';

import '../../styles/product.scss';

const ProductEdit = ({ product, element, cantElements, parentActions }) => {

    const hasDescriptionProduct = product && product?.description && product.description.length > 0;

    const [show, setShow] = useState(false);
    const [actionPrices, setActionPrices] = useState(null);
    const [actionDescription, setActionDescription] = useState(null);
    const [actionDetails, setActionDetails] = useState(null);

    const inputActions = {
        changeName: {
            type: ACTIONS_PRODUCT.CHANGE_NAME,
            payload: { element: element }
        },
        changeDetails: {
            type: ACTIONS_PRODUCT.CHANGE_DETAILS,
            payload: { element: element }
        },
        changeDescription: {
            type: ACTIONS_PRODUCT.CHANGE_DESCRIPTION,
            payload: { element: element }
        },
        changeTextPrice: {
            type: ACTIONS_PRODUCT.CHANGE_PRICES.CHANGE_PRICE,
            payload: { element: element }
        },
        changeDescriptionPrice: {
            type: ACTIONS_PRODUCT.CHANGE_PRICES.CHANGE_DESCRIPTION,
            payload: { element: element }
        }
    }

    const showInfo = function () {
        return (
            <div className="description-container-edit">
                <ImagesEdit parentElement={element} />
                {hasDescriptionProduct &&
                    <InputEdit
                        action={inputActions.changeDescription}
                        text={product.description}
                        className="description-product-edit"
                        textArea={true}
                    />
                }
            </div>
        );
    }

    return (
        <li>
            <ProductAction name={PRICES} setAction={setActionPrices} />
            <ProductAction name={DESCRIPTION} setAction={setActionDescription} />
            <ProductAction name={DETAILS} setAction={setActionDetails} />

            <div className="info-product-edit">
                <ButtonConfigComponent
                    indexElement={element.index}
                    actionElement={element.parent}
                    actionComponent={parentActions}
                    messageAlert={"¿Desea eliminar este Producto?"}
                    cantElements={cantElements} />
                <ButtonViewMore className="btn-view-more" show={show} setShow={setShow} />
                <TittleProductEdit product={product} inputActions={inputActions} />
                <PricesEdit prices={product.prices} inputActions={inputActions} />
            </div>

            {show && <div className={"add-container"} >
                <div className={"add-component"}>
                    <ButtonConfigComponent indexElement={product?.prices?.length} actionElement={element} actionComponent={actionPrices} />
                    <span className="add-text">Añadir Precio</span>
                </div >
                <div className={"add-component"}>
                    <ButtonConfigComponent actionElement={element} actionComponent={actionDetails} />
                    <span className="add-text">Añadir Detalle</span>
                </div>
                <div className={"add-component"}>
                    <ButtonConfigComponent actionElement={element} actionComponent={actionDescription} />
                    <span className="add-text">Añadir Descripcion</span>
                </div>
            </div>}

            <div style={{ display: show ? "block" : "none" }}  >{showInfo()}</div>
        </li>
    );
};

export default ProductEdit;