import React from 'react';
import ProductEdit from './ProductEdit';
import { PRODUCT } from '../GetComponents/Constants';
const ProductsEdit = ({ products, parentActions, parentElement }) => {
    return (
        <>
            {products.map((product, indexProduct) => {
                
                return <ProductEdit
                    product={product}
                    element={{
                        name: PRODUCT,
                        index: indexProduct,
                        parent: parentElement,
                        json: product
                    }}
                    key={"product" + indexProduct}
                    cantElements={products.length}
                    parentActions={parentActions}
                />
            })}
        </>
    );
};

export default ProductsEdit;