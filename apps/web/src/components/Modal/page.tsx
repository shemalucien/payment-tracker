// components/Modal.tsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
 children: React.ReactNode;
 isOpen: boolean;
 onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
 useEffect(() => {
    // Disable scrolling when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Add keyboard accessibility
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown, false);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
    };
 }, [isOpen, onClose]);

 if (!isOpen) {
    return null;
 }

 return (
    <div className="relative flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-black bg-opacity-0 fixed inset-0" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
 );
};

export default Modal;
