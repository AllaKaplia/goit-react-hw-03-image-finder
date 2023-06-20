import { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalImg } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
    componentDidMount(){
        window.addEventListener('keydown', this.handleKeydown)
    }

    componentWillUnmount (){
        window.removeEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = (evt) => {
            
        if(evt.code === 'Escape'){
            this.props.onClose();
        }
    }

    handleBackdropClick = (evt) => {
        if(evt.target === evt.currentTarget){
            this.props.onClose();
        }
    }
    
    render(){        
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalImg>
                    {this.props.children}
                </ModalImg>
            </Overlay>, modalRoot)
    }
}