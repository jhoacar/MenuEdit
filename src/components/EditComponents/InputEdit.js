import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AiFillCheckCircle, AiOutlineReload } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

class InputEdit extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            initialText: props.text,
            text: props.text,
            changed: false,
        }
        this.textRef = React.createRef();
    }
    
    componentDidMount() {

        const inputText = this.textRef.current;

        if (inputText)
            inputText.addEventListener('keydown', event => {
                
                if (event.key === 'Enter')
                    this.loadChanges();
                else if(event.key === 'Escape')
                    this.resetChanges();     
            });
    }

    static getDerivedStateFromProps(props, state) {

        //Esta funcion se ejecuta en cada render y analiza el estado con las props
        //Esto se usa para saber como debe cambiar el estado con la prop que le aparezca nueva
        if (props.text !== state.initialText) {

            return {
                initialText: props.text,
                text: props.text,
                changed: state.changed
            };
        }
        return state;
    }

    handleChange = event => {
        this.setState({
            ...this.state,
            text: event.target.value,
            changed: true
        });
    }


    loadChanges = event => {
        this.setState({
            ...this.state,
            changed: false
        });
        this.props.loadText(this.props.action, this.state.text)
    }

    resetChanges = event => {
        this.setState({
            ...this.state,
            text: this.state.initialText,
            changed: false
        });
    }

    deleteText = event => {
        this.setState({
            ...this.state,
            text: ""
        });
    }


    render() {
        return (
            <div className={this.props.containerClassName}>

                {this.props.textArea &&
                    <textarea rows="4" cols="15"
                        className={" input-edit " + this.props.className}
                        style={{
                            resize: 'none',
                            overflowX: 'hidden',
                        }}
                        value={this.state.text}
                        onChange={this.handleChange}
                        ref={this.textRef}
                    />
                }
                {!this.props.textArea &&
                    <input
                        className={" input-edit " + this.props.className}
                        //Le asignamos un ancho correspondiente al tamaño del texto que se encuentre escribiendo
                        style={{ width: ((this.state.text?.length ? this.state.text.length*1.1 : 4)) + "ch" }}
                        value={this.state.text}
                        onChange={this.handleChange}
                        type={"text"}
                        ref={this.textRef}
                    />
                }
                {this.state.changed &&
                    <div className="container-input-buttons">
                        <AiFillCheckCircle style={{ cursor: "pointer" }} onClick={this.loadChanges} size={20} />
                        <AiOutlineReload style={{ cursor: "pointer" }} onClick={this.resetChanges} size={20} />
                        <ImCancelCircle style={{ cursor: "pointer" }} onClick={this.deleteText} size={20} />
                    </div>
                }
            </div>);
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    loadText(action, text) {
        dispatch({
            type: action.type,
            payload: {
                element: action.payload.element,
                text: text
            }
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputEdit);