import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LogIn from "./pages/login/Login";
import ErrorPage from "./pages/error/ErrorPage";
import Terror from "./pages/terror/Terror";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path="/terror" element={<Terror />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
