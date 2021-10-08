import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ACTIONS_PRODUCT } from '../ReducersComponents/ProductReducer';

class ImagesAction extends Component {

    constructor(props) {
        super(props);
        this.props.setAction(this.actionComponent);
    }

    deleteImage = (element, index) => {
        this.props.action(element, index, ACTIONS_PRODUCT.DELETE_IMAGE)
    }
    moveUpImage = (element, index) => {
        this.props.action(element, index, ACTIONS_PRODUCT.MOVE_UP_IMAGE)
    }
    moveDownImage = (element, index) => {
        this.props.action(element, index, ACTIONS_PRODUCT.MOVE_DOWN_IMAGE)
    }

    actionComponent = {
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



export default connect(mapStateToProps, mapDispatchToProps)(ImagesAction);