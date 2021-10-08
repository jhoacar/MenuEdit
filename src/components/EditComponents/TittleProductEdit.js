import React from 'react';

import InputEdit from './InputEdit';

const TittleProductEdit = ({product, inputActions }) => {

    const hasDetailsProduct = product && product?.details && product.details.length > 0;
    
    return (
        <div className="tittle-product">

            <div className="features-product">

                <InputEdit
                    action={inputActions.changeName}
                    text={product.name}
                    className="name-product-edit"
                    containerClassName="container-input"
                />
                {hasDetailsProduct &&
                    <InputEdit
                        action={inputActions.changeDetails}
                        text={product.details}
                        className="details-product-edit"
                        containerClassName="container-input"
                    />
                }
            </div>
        </div>
    );
};

export default TittleProductEdit;