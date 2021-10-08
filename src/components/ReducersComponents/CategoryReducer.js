export const ACTIONS_CATEGORY = {
    CHANGE_NAME: "cambiar nombre categoria",
    CHANGE_DESCRIPTION: "cambiar descripcion categoria",
    ADD_PRODUCT: "agregar producto",
    DELETE_PRODUCT: "eliminar producto",
    ADD_SUBCATEGORY: "agregar subcategoria",
    DELETE_SUBCATEGORY: "eliminar subcategoria",
    MOVE_UP_SUBCATEGORY: "mover arriba subcategoria",
    MOVE_DOWN_SUBCATEGORY: "mover abajo subcategoria",
    MOVE_UP_PRODUCT: "mover arriba producto",
    MOVE_DOWN_PRODUCT: "mover abajo producto"
}



const categoryReducer = (stateCategory, action) => {

    let index, subcategory, product, size;

    switch (action.type) {

        case ACTIONS_CATEGORY.CHANGE_NAME:

            stateCategory.name = action.payload.text;

            return stateCategory;

        case ACTIONS_CATEGORY.CHANGE_DESCRIPTION:

            stateCategory.description = action.payload.text;

            return stateCategory;

        case ACTIONS_CATEGORY.ADD_PRODUCT:

            index = action?.payload?.index === undefined ? -1 : action.payload.index;

            if (!stateCategory.products)
                stateCategory.products = [];

            stateCategory.products.splice(index + 1, 0,
                {
                    name: "Nuevo Producto ",
                    details: "",
                    description: "",
                    prices: [],
                    images: []
                }
            );

            return stateCategory;

        case ACTIONS_CATEGORY.DELETE_PRODUCT:

            stateCategory.products = stateCategory.products.filter((product, indexProduct) => indexProduct !== action.payload.index);
            return stateCategory;

        case ACTIONS_CATEGORY.ADD_SUBCATEGORY:

            index = !action.payload.index ? -1 : action.payload.index;

            if (!stateCategory.categories)
                stateCategory.categories = [];

            stateCategory.categories.splice(index + 1, 0,
                {
                    name: "Subcategoria",
                    description: "",
                    products: [],
                    categories: []
                }
            );

            return stateCategory;

        case ACTIONS_CATEGORY.DELETE_SUBCATEGORY:

            stateCategory.categories = stateCategory.categories.filter((subcategory, indexSubCategory) => indexSubCategory !== action.payload.index);
            return stateCategory;

        case ACTIONS_CATEGORY.MOVE_UP_PRODUCT:

            index = action.payload.index;
            product = stateCategory.products[index];
            size = stateCategory.products.length;

            stateCategory.products = stateCategory.products.filter((product, indexProduct) => indexProduct !== index);

            stateCategory.products.splice(index > 0 ? index - 1 : size - 1, 0, product);

            return stateCategory;

        case ACTIONS_CATEGORY.MOVE_DOWN_PRODUCT:

            index = action.payload.index;
            product = stateCategory.products[index];
            size = stateCategory.products.length;

            stateCategory.products = stateCategory.products.filter((product, indexProduct) => indexProduct !== index);

            stateCategory.products.splice(index < size - 1 ? index + 1 : 0, 0, product);

            return stateCategory;

        case ACTIONS_CATEGORY.MOVE_UP_SUBCATEGORY:

            index = action.payload.index;
            subcategory = stateCategory.categories[index];
            size = stateCategory.categories.length;

            stateCategory.categories = stateCategory.categories.filter((subcategory, indexSubCategory) => indexSubCategory !== index);

            stateCategory.categories.splice(index > 0 ? index - 1 : size - 1, 0, subcategory);

            return stateCategory;

        case ACTIONS_CATEGORY.MOVE_DOWN_SUBCATEGORY:

            index = action.payload.index;
            subcategory = stateCategory.categories[index];
            size = stateCategory.categories.length;


            stateCategory.categories = stateCategory.categories.filter((subcategory, indexSubCategory) => indexSubCategory !== index);

            stateCategory.categories.splice(index < size - 1 ? index + 1 : 0, 0, subcategory);

            return stateCategory;

        default:

            return stateCategory;
    }
}

export default categoryReducer;