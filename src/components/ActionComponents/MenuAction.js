import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTIONS_MENU } from '../ReducersComponents/MenuReducer';

class MenuAction extends Component {

    constructor(props) {
        super(props);
        props.setAction(this.actionComponent)
    }

    addPage = (element, index) => {
        this.props.action(element, index, ACTIONS_MENU.ADD_PAGE);
    }

    deletePage = (element, index) => {
        this.props.action(element, index, ACTIONS_MENU.DELETE_PAGE)
    }

    moveUpPage = (element, index) => {
        this.props.action(element, index, ACTIONS_MENU.MOVE_UP_PAGE)
    }
    moveDownPage = (element, index) => {
        this.props.action(element, index, ACTIONS_MENU.MOVE_DOWN_PAGE)
    }

    actionComponent = {
        addItem: this.addPage,
        deleteItem: this.deletePage,
        moveUpItem: this.moveUpPage,
        moveDownItem: this.moveDownPage
    }

    render() {
        return <></>;
    }

}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    action(element, index, type) {
        dispatch({
            type: type,
            payload: {
                element: element,
                index: index
            }
        })
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(MenuAction);


export const changeStylesPageNext = actualPage => {

    const $actualPage = document.getElementById('page' + actualPage);
    const numNextPage = actualPage + 1;
    const $nextPage = document.getElementById('page' + numNextPage);

    if ($actualPage && $nextPage) {

        $actualPage.classList.remove("page-show");
        $actualPage.classList.add("page-hide");

        $nextPage.classList.add("page-show");
        $nextPage.classList.remove("page-hide");
    }
}

export const changeStylesPagePrev = actualPage => {

    const $actualPage = document.getElementById('page' + actualPage);
    const numPrevPage = actualPage - 1;
    const $prevPage = document.getElementById('page' + numPrevPage);

    if ($actualPage && $prevPage) {

        $actualPage.classList.remove("page-show");
        $actualPage.classList.add("page-hide");

        $prevPage.classList.add("page-show");
        $prevPage.classList.remove("page-hide");
    }
}