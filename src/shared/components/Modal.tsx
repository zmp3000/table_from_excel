import React from "react";
import { createPortal } from "react-dom";

interface IModalInterface {
  children: React.ReactNode;
}

const Modal: React.FC<IModalInterface> = ({
  children,
}) => {
  return createPortal(
    children,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
