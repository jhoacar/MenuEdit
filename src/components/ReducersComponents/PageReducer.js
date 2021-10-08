export const ACTIONS_PAGE = {
    CHANGE_TITTLE: "cambiar titulo",
    CHANGE_DESCRIPTION: "cambiar descripcion",
    ADD_CATEGORY: "agregar categoria",
    DELETE_CATEGORY: "eliminar categoria",
    MOVE_UP_CATEGORY: "mover arriba categoria",
    MOVE_DOWN_CATEGORY: "mover abajo categoria"
}


const pageReducer = (statePage, action) => {

    let index, category, size;


    switch (action.type) {

        case ACTIONS_PAGE.CHANGE_TITTLE:

            statePage.tittle = action.payload.text;

            return statePage;

        case ACTIONS_PAGE.ADD_CATEGORY:

            index = action.payload.index===undefined ? -1 : action.payload.index;

            statePage.categories.splice(index+1, 0,
                {
                    name: "Nueva Categoria",
                    description: "",
                    products: [],
                    categories: []
                });

            return statePage;

        case ACTIONS_PAGE.DELETE_CATEGORY:

            index = action.payload.index;
            statePage.categories = statePage.categories.filter((category, indexCategory) => indexCategory !== index);

            return statePage;

        case ACTIONS_PAGE.MOVE_UP_CATEGORY:

            index = action.payload.index;
            category = statePage.categories[index];
            size = statePage.categories.length;

            statePage.categories = statePage.categories.filter((category, indexCategory) => indexCategory !== index);

            statePage.categories.splice(index > 0 ? index - 1 : size - 1, 0, category);

            return statePage;

        case ACTIONS_PAGE.MOVE_DOWN_CATEGORY:

            index = action.payload.index;
            category = statePage.categories[index];
            size = statePage.categories.length;

            statePage.categories = statePage.categories.filter((category, indexCategory) => indexCategory !== index);

            statePage.categories.splice(index < size - 1 ? index + 1 : 0, 0, category);

            return statePage;

        default:

            return statePage;
    }
}

export default pageReducer;