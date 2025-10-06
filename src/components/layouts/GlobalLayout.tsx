import React, { ReactNode } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface GlobalLayoutProps {
  children: ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-slate-900">
      <Header />
      <main className="p-4 sm:p-6 lg:p-10">{children}</main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
