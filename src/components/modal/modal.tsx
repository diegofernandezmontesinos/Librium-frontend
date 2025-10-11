import { FC, ReactNode } from "react";
import { ModalProps } from "./modalTypes";

export const Modal: FC<ModalProps> = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};
