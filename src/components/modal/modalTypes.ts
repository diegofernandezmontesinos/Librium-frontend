import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  message: string | ReactNode;
  onClose: () => void;
}