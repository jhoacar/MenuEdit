import React, { useState } from 'react';
import InputEdit from './InputEdit';
import ButtonViewMore from '../Buttons/ButtonViewMore';

import { CATEGORY, DESCRIPTION, PRODUCT } from '../GetComponents/Constants'

import '../../styles/category.scss';

import { ACTIONS_CATEGORY } from '../ReducersComponents/CategoryReducer';
import ButtonConfigComponent from '../Buttons/ButtonConfigComponent';
import CategoryAction from '../ActionComponents/CategoryAction';
import ProductsEdit from './ProductsEdit';
import CategoriesEdit from './CategoriesEdit';

const CategoryEdit = function ({ category, element, cantElements, parentAction }) {

    const hasDescriptionCategory = category && category?.description && category.description.length > 0;
    const showButton = true;
    const [showProducts, setShowProducts] = useState(false);
    const [actionProducts, setActionProducts] = useState(null);
    const [actionSubcategory, setActionSubcategory] = useState(null);
    const [actionDescription, setActionDescription] = useState(null);


    const inputActions = {
        changeTittle: {
            type: ACTIONS_CATEGORY.CHANGE_NAME,
            payload: { element: element }
        },
        changeDescription: {
            type: ACTIONS_CATEGORY.CHANGE_DESCRIPTION,
            payload: { element: element }
        }
    }

    const showAllProducts = function () {

        const hasProducts = category && category?.products && Array.isArray(category.products) && category.products.length > 0;
        const hasSubCategories = category && category?.categories && Array.isArray(category.categories) && category.categories.length > 0;

        return (
            <ul className="list-products">
                {hasProducts && <ProductsEdit products={category.products} parentActions={actionProducts} parentElement={element} />}

                {hasSubCategories && <CategoriesEdit categories={category.categories} parentAction={actionSubcategory} parentElement={element} />}
            </ul>
        );
    }

    return (
        <div style={{ overflowX: 'hidden' }} className="category">

            <CategoryAction name={PRODUCT} setAction={setActionProducts} />
            <CategoryAction name={CATEGORY} setAction={setActionSubcategory} />
            <CategoryAction name={DESCRIPTION} setAction={setActionDescription} />

            <div className="info-category-container">

                <ButtonConfigComponent indexElement={element.index} actionElement={element.parent} actionComponent={parentAction} messageAlert={"¿Desea eliminar esta categoria?"} cantElements={cantElements} />

                <div className="info-category-edit">

                    {showButton && <ButtonViewMore className="view-more boton-not-pressed" show={showProducts} setShow={setShowProducts} />}

                    <div>
                        
                        <InputEdit action={inputActions.changeTittle} text={category.name} className="tittle-category-edit" />

                        {hasDescriptionCategory && <InputEdit action={inputActions.changeDescription} text={category.description} className="description-category" />}
                    
                    </div>
                </div>
            </div>

            {showProducts && <div className={"add-container"} >

                <div className={"add-component"}>
                    <ButtonConfigComponent indexElement={category?.products?.length} actionElement={element} actionComponent={actionProducts} />
                    <span className="add-text">Añadir Producto</span>
                </div >
                <div className={"add-component"}>
                    <ButtonConfigComponent indexElement={category?.categories?.length} actionElement={element} actionComponent={actionSubcategory} />
                    <span className="add-text">Añadir Subcategoria</span>
                </div>
                <div className={"add-component"}>
                    <ButtonConfigComponent indexElement={0} actionElement={element} actionComponent={actionDescription} />
                    <span className="add-text">Añadir Descripcion</span>
                </div>
            </div>}

            <div style={{ display: showProducts ? 'block' : 'none' }} >{showAllProducts()}</div>
        </div>
    )
};

export default CategoryEdit;