import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  const hendelKeyDown = e => {
    console.log(e);
    if (e.code === 'Escape') {
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
