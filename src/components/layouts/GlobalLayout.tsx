import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-slate-900">
      <Header />
      <main className="p-4 sm:p-6 lg:p-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
