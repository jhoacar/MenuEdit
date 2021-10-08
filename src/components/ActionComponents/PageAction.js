import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTIONS_PAGE } from '../ReducersComponents/PageReducer';

class PageAction extends Component {
    
    constructor(props){
        super(props);
        props.setAction(this.actionComponent)
    }

    addCategory = (element, index) => {
        this.props.action(element, index, ACTIONS_PAGE.ADD_CATEGORY);
    }

    deleteCategory = (element, index) => {
        this.props.action(element, index, ACTIONS_PAGE.DELETE_CATEGORY);
    }

    moveUpCategory = (element, index) => {
        this.props.action(element, index, ACTIONS_PAGE.MOVE_UP_CATEGORY);
    }

    moveDownCategory = (element, index) => {
        this.props.action(element, index, ACTIONS_PAGE.MOVE_DOWN_CATEGORY);
    }

    actionComponent = {
        addItem: this.addCategory,
        deleteItem: this.deleteCategory,
        moveUpItem: this.moveUpCategory,
        moveDownItem: this.moveDownCategory
    }

    render(){
        return <></>;
    }

}

const mapStateToProps = state => ({});

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



export default connect(mapStateToProps, mapDispatchToProps)(PageAction);