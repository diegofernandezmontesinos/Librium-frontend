import React, { ReactNode } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* El main ocupa todo el espacio disponible */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default GlobalLayout;
