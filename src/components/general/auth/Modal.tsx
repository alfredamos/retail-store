import { ReactNode } from "react";
import { createPortal } from "react-dom";
import "./modal.css";

interface ModalProps {
  children: ReactNode;
}

function Modal({ children }: ModalProps) {
  //const tabIndex = 1;

  return createPortal(
    <div className="overlay">
      <div className="modale shadow-lg p-5 border-2 border-primary">
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
