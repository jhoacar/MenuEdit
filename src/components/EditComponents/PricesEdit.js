import React from 'react';
import InputEdit from './InputEdit';

const PricesEdit = ({ prices, inputActions }) => {

    const hasPrice = prices && prices.length > 0;
    const hasOnePrice = hasPrice && Array.isArray(prices) && prices.length === 1;
    const hasMuchPrices = hasPrice && Array.isArray(prices) && prices.length > 1;

    const changeIndexPrice = (action, index) => {
        const element = {
            ...action.payload.element,
            indexPrice: index
        };
        return {
            ...action,
            payload: { element: element }
        }
    }

    return (
        <>
            {hasOnePrice &&
                <div className={"single-price-container"}>
                    <InputEdit
                        action={changeIndexPrice(inputActions.changeTextPrice, 0)}
                        text={prices[0].price}
                        className="single-price"
                        containerClassName="container-input" />
                </div>
            }
            {hasMuchPrices &&
                <ul className="prices-products">
                    {prices.map((price, indexPrice) =>

                        <li className="price-product-edit" key={"description" + indexPrice}>
                            {price.description !== undefined &&
                                <InputEdit
                                    action={changeIndexPrice(inputActions.changeDescriptionPrice, indexPrice)}
                                    text={price.description}
                                    className="description-price"
                                />
                            }
                            {price.price !== undefined &&
                                <InputEdit
                                    action={changeIndexPrice(inputActions.changeTextPrice, indexPrice)}
                                    text={price.price}
                                    className="multiple-price"
                                    containerClassName="container-input"
                                />
                            }
                        </li>
                    )}
                </ul>
            }
        </>
    );
};

export default PricesEdit;