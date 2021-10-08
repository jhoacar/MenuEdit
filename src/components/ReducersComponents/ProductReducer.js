
export const ACTIONS_PRODUCT = {

    CHANGE_NAME: "cambiar nombre producto",
    CHANGE_DESCRIPTION: "cambiar descripcion",
    CHANGE_DETAILS: "cambiar detalles",
    CHANGE_PRICES: {
        CHANGE_DESCRIPTION: "cambiar descripcion precio",
        CHANGE_PRICE: "cambiar precio de descripcion"
    },
    ADD_PRICE: "agregar precio",
    ADD_IMAGE: "agregar imagen",
    DELETE_IMAGE: "eliminar imagen",
    MOVE_UP_IMAGE: "mover arriba imagen",
    MOVE_DOWN_IMAGE: "mover abajo imagen"
}

const productReducer = (stateProduct, action) => {

    let indexPrice, text, indexImage, srcImage, size;


    switch (action.type) {

        case ACTIONS_PRODUCT.CHANGE_NAME:

            stateProduct.name = action.payload.text;
            return stateProduct;

        case ACTIONS_PRODUCT.CHANGE_DESCRIPTION:

            stateProduct.description = action.payload.text;
            return stateProduct;

        case ACTIONS_PRODUCT.CHANGE_DETAILS:

            stateProduct.details = action.payload.text;
            return stateProduct;

        case ACTIONS_PRODUCT.ADD_PRICE:

            if (!stateProduct.prices)
                stateProduct.prices = [];

            stateProduct.prices.push({ description: "PRICE", price: 0 })

            return stateProduct;

        case ACTIONS_PRODUCT.CHANGE_PRICES.CHANGE_DESCRIPTION:

            indexPrice = action.payload.element.indexPrice;
            text = action.payload.text;

            if (!isNaN(indexPrice))
                stateProduct.prices[indexPrice].description = text;

            return stateProduct;

        case ACTIONS_PRODUCT.CHANGE_PRICES.CHANGE_PRICE:

            indexPrice = action.payload.element.indexPrice;
            text = action.payload.text;

            //Si no hay ningun precio, entonces lo eliminamos de la lista de precios
            if (!text.length)
                stateProduct.prices = stateProduct.prices.filter((price, index) => index !== indexPrice)
            else if (!isNaN(indexPrice))
                stateProduct.prices[indexPrice].price = text;

            return stateProduct;

        case ACTIONS_PRODUCT.ADD_IMAGE:

            srcImage = action.payload.src;

            if (!stateProduct?.images)
                stateProduct.images = []

            stateProduct.images.push(srcImage)

            return stateProduct;

        case ACTIONS_PRODUCT.DELETE_IMAGE:

            indexImage = action.payload.index;

            stateProduct.images = stateProduct.images.filter((src, index) => index !== indexImage)

            return stateProduct;

        case ACTIONS_PRODUCT.MOVE_UP_IMAGE:

            indexImage = action.payload.index;
            srcImage = stateProduct.images[indexImage];
            size = stateProduct.images.length;

            stateProduct.images = stateProduct.images.filter((src, index) => indexImage !== index);

            stateProduct.images.splice(indexImage > 0 ? indexImage - 1 : size - 1, 0, srcImage);

            return stateProduct;

        case ACTIONS_PRODUCT.MOVE_DOWN_IMAGE:

            indexImage = action.payload.index;
            srcImage = stateProduct.images[indexImage];
            size = stateProduct.images.length;

            stateProduct.images = stateProduct.images.filter((src, index) => indexImage !== index);

            stateProduct.images.splice(indexImage < size - 1 ? indexImage + 1 : 0, 0, srcImage);

            return stateProduct;

        default:

            return stateProduct;
    }
};

export default productReducer;