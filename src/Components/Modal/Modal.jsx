import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendelKeyDown);
  }

  hendelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.hendelBackdropClick}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
export default Modal;
