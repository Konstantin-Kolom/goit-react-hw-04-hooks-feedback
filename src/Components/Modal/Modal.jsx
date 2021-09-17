import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  const hendelKeyDown = e => {
    console.log(e);
    if (e.code === 'Escape') {
      // console.log('fff');
      onClose();
    }
  };

  const hendelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', hendelKeyDown);
    return window.removeEventListener('keydown', hendelKeyDown);
  });

  return createPortal(
    <div className={s.Overlay} onClick={hendelBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

// class Modal1 extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.hendelKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.hendelKeyDown);
//   }

//   hendelKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   hendelBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={s.Overlay} onClick={this.hendelBackdropClick}>
//         <div className={s.Modal}>{this.props.children}</div>
//       </div>,
//       modalRoot,
//     );
//   }
// }
// export default Modal1;
