// components/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; // optional for extra styles

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content shadow-lg rounded-4">
        <button className="btn-close" onClick={onClose}>x</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
