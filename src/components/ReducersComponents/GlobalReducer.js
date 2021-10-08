import { ALERT, MENU, PAGE, CATEGORY, PRODUCT } from '../GetComponents/Constants';

import menuReducer from './MenuReducer';
import pageReducer from './PageReducer';
import categoryReducer from './CategoryReducer';
import productReducer from './ProductReducer';

/*Ente encargado de distribuir la porcion del estado que va a cambiar a cada reducerComponent*/

const getHierarchicalArray = function (element) {
    const hierarchicalArray = []
    let auxElement = Object.assign({}, element);
    while (auxElement?.parent?.name !== MENU) {
        hierarchicalArray.push(auxElement.index);
        auxElement = auxElement.parent;
    }
    hierarchicalArray.push(auxElement.index)
    return hierarchicalArray;
}

const setCategoryPage = function (page , category , hierarchicalArray) {

    let actualCategory = page.categories;
    let indexCategory = hierarchicalArray.pop();

    while (actualCategory && hierarchicalArray.length > 0) {
        actualCategory = actualCategory[indexCategory].categories;
        indexCategory = hierarchicalArray.pop();
    }
    actualCategory[indexCategory] = category;
}

//Metodo encargado de recorrer el arbol de subcategorias hasta encontrar la que corresponde
const loadCategory = function (pages, category, element) {

    //Generamos un array que contendra las posiciones en la estructura de datos
    const hierarchicalArray = getHierarchicalArray(element)
    
    //Lo cargamos con las posiciones que se extrajeron y se cargan a la pagina
    const indexPage = hierarchicalArray.pop()
    const page = pages[indexPage]

    setCategoryPage(page , category , hierarchicalArray)
}


const loadProduct = function (pages, product, element) {

    //Generamos un array que contendra las posiciones en la estructura de datos
    const hierarchicalArray = getHierarchicalArray(element)

    const indexPage = hierarchicalArray.pop()
    const page = pages[indexPage]
    const indexProduct = hierarchicalArray.shift()

    let actualCategory = page.categories;
    let indexCategory = hierarchicalArray.pop();

    while (actualCategory && hierarchicalArray.length > 0) {
        actualCategory = actualCategory[indexCategory].categories;
        indexCategory = hierarchicalArray.pop();
    }
    actualCategory[indexCategory].products[indexProduct] = product;
}


const globalReducer = (state, action) => {

    const element = action.payload.element;

    let newPages, categoryToChange, productToChange;

    if (!element) return state;

    switch (element.name) {

        
        case ALERT:
            return {
                ...state,
                activeAlert: action.payload.alert
            }

        case MENU:

            return menuReducer(state, action);

        case PAGE:

            newPages = Object.assign([], state.pages)
            
            newPages[element.index] = pageReducer(element.json, action);

            return {
                ...state,
                pages: newPages
            };

        case CATEGORY:


            newPages = Object.assign([], state.pages)

            categoryToChange = categoryReducer(Object.assign({}, element.json), action);

            loadCategory(newPages, categoryToChange, element)

            return {
                ...state,
                pages: newPages
            }

        case PRODUCT:

            newPages = Object.assign([], state.pages);

            productToChange = productReducer(Object.assign({}, element.json), action);
            
            loadProduct(newPages, productToChange, element)

            return {
                ...state,
                pages: newPages
            }

        default:

            return state;
    }

};

export default globalReducer;