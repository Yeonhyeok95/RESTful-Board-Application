import React, { ReactNode } from "react";
import "./style.css";
import ReactDOM from "react-dom";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const AddressSearchModal: React.FC<ModalProps> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AddressSearchModal;
