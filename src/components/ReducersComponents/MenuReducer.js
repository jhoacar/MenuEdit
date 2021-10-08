import { MENU } from '../GetComponents/Constants';

export const ACTIONS_MENU = {
    ADD_PAGE: "agregar pagina",
    DELETE_PAGE: "borrar pagina",
    MOVE_PAGE: "mover pagina",
    NEXT_PAGE: "pagina siguiente",
    PREV_PAGE: "pagina anterior",
    RESET_PAGE: "reiniciar paginas",
    CHANGE_PAGE: "cambiar pagina",
    MOVE_UP_PAGE: "mover arriba la pagina",
    MOVE_DOWN_PAGE: "mover para abajo la pagina"
}
const menuReducer = (state, action) => {

    if (action.payload.element.name !== MENU) return state;

    let indexPage, newPages, page, size;

    switch (action.type) {

        case ACTIONS_MENU.ADD_PAGE:

            indexPage = action.payload.index;

            return {
                ...state,
                pages: [
                    ...state.pages.slice(0, indexPage + 1),
                    { tittle: "Titulo (" + (state.pages.length + 1) + ")", categories: [] },
                    ...state.pages.slice(indexPage + 1)
                ]
            };

        case ACTIONS_MENU.DELETE_PAGE:

            indexPage = action.payload.index;

            return {
                ...state,
                pages: state.pages.filter((page, index) => index !== indexPage)
            };

        case ACTIONS_MENU.MOVE_UP_PAGE:

            newPages = Object.assign([], state.pages);
            page = newPages[action.payload.index];
            size = newPages.length;
            newPages = newPages.filter((page, index) => index !== action.payload.index);
            indexPage = action.payload.index > 0 ? action.payload.index - 1 : size - 1;
            newPages.splice(indexPage, 0, page);

            return {
                ...state,
                pages: newPages
            }

        case ACTIONS_MENU.MOVE_DOWN_PAGE:

            newPages = Object.assign([], state.pages);
            page = newPages[action.payload.index];
            size = newPages.length;
            newPages = newPages.filter((page, index) => index !== action.payload.index);
            indexPage = action.payload.index < size - 1 ? action.payload.index + 1 : 0;
            newPages.splice(indexPage, 0, page);

            return {
                ...state,
                pages: newPages
            }
        case ACTIONS_MENU.RESET_PAGE:

            return {
                ...state,
                actualPage: 0
            }
        case ACTIONS_MENU.CHANGE_PAGE:

            return {
                ...state,
                actualPage: action.payload.changePage
            }

        default:
            return state;
    }
};

export default menuReducer;