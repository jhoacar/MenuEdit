import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DESCRIPTION, PRICES, DETAILS, IMAGE } from '../GetComponents/Constants';
import { ACTIONS_PRODUCT } from '../ReducersComponents/ProductReducer';

class ProductAction extends Component {

    constructor(props) {
        super(props);
        if (props.name === PRICES)
            props.setAction(this.actionComponentPrice)
        else if (props.name === DESCRIPTION)
            props.setAction(this.actionComponentDescription)
        else if (props.name === DETAILS)
            props.setAction(this.actionComponentDetails)
        else if (props.name === IMAGE)
            props.setAction(this.actionComponentImage)
    }

    addPrice = element => {
        this.props.action(element, ACTIONS_PRODUCT.ADD_PRICE, "")
    }
    addDescription = element => {
        if (!element?.json?.details || element?.json?.description?.length === 0)
            this.props.action(element, ACTIONS_PRODUCT.CHANGE_DESCRIPTION, "Descripcion")
    }
    addDetails = element => {
        if (!element?.json?.details || element?.json?.details?.length === 0)
            this.props.action(element, ACTIONS_PRODUCT.CHANGE_DETAILS, "Detalle")
    }

    actionComponentPrice = {
        addItem: this.addPrice,
    }

    actionComponentDescription = {
        addItem: this.addDescription,
    }
    actionComponentDetails = {
        addItem: this.addDetails,
    }
    actionComponentImage = {
        addItem: this.addImage,
        deleteItem: this.deleteImage,
        moveUpItem: this.moveUpImage,
        moveDownItem: this.moveDownImage,
    }

    render() {
        return <></>;
    }

}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    action(element, type, text) {
        dispatch({
            type: type,
            payload: {
                element: element,
                text: text
            }
        })
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(ProductAction);