import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LogIn from "./pages/login/Login";
import ErrorPage from "./pages/error/ErrorPage";
import Terror from "./pages/terror/Terror";
import ProtectedRoutes from "./utils/protectedRoutes/ProtectedRoutes";
import Register from "./pages/register/Register";
import BooksPage from "./components/booksPage/BooksPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/terror" element={<Terror />} />
          <Route path="/books-page" element={<BooksPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
