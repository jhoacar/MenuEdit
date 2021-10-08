import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTIONS_CATEGORY } from '../ReducersComponents/CategoryReducer';
import {PRODUCT, CATEGORY, DESCRIPTION} from '../GetComponents/Constants';

class CategoryAction extends Component {
    
    constructor(props){
        super(props);
        if(props.name===PRODUCT)
            props.setAction(this.actionComponentProduct)
        else if(props.name===CATEGORY)
            props.setAction(this.actionComponentSubcategory)
        else if(props.name===DESCRIPTION)
            props.setAction(this.actionComponentDescription)
    }

    addDescription = element =>{
        this.props.changeDescription(element, "Descripcion");
    }

    addSubcategory = (element,index) => {
        this.props.action(element, index, ACTIONS_CATEGORY.ADD_SUBCATEGORY)
    }

    deleteSubcategory = (element,index) => {
        this.props.action(element, index, ACTIONS_CATEGORY.DELETE_SUBCATEGORY)
    }
    moveUpSubcategory = (element,index) => {
        this.props.action(element, index, ACTIONS_CATEGORY.MOVE_UP_SUBCATEGORY)
    }
    moveDownSubcategory = (element,index) => {
        this.props.action(element, index, ACTIONS_CATEGORY.MOVE_DOWN_SUBCATEGORY)
    }
    addProduct = (element,index) => {
        this.props.action(element, index, ACTIONS_CATEGORY.ADD_PRODUCT)
    }
    deleteProduct = (element,index) => {
        this.props.action(element, index, ACTIONS_CATEGORY.DELETE_PRODUCT)
    }
    moveUpProduct = (element,index) => {
        this.props.action(element, index, ACTIONS_CATEGORY.MOVE_UP_PRODUCT)
    }
    moveDownProduct = (element,index) => {
        this.props.action(element, index, ACTIONS_CATEGORY.MOVE_DOWN_PRODUCT)
    }

    actionComponentSubcategory = {
        addItem: this.addSubcategory,
        deleteItem: this.deleteSubcategory,
        moveUpItem: this.moveUpSubcategory,
        moveDownItem: this.moveDownSubcategory
    };

    actionComponentProduct = {
        addItem: this.addProduct,
        deleteItem: this.deleteProduct,
        moveUpItem: this.moveUpProduct,
        moveDownItem: this.moveDownProduct
    }

    actionComponentDescription = {
        addItem: this.addDescription
    }

    render(){
        return <></>;
    }

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    action(element, index, type) {
        dispatch({
            type: type,
            payload: {
                element: element,
                index: index
            }
        })
    },
    changeDescription(element,text){
        dispatch({
            type: ACTIONS_CATEGORY.CHANGE_DESCRIPTION,
            payload: {
                element: element,
                text: text
            }
        })
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(CategoryAction);