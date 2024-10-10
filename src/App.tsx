import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import LogIn from "./pages/login/login";
import ErrorPage from "./pages/error/ErrorPage";
import Terror from "./pages/terror/Terror";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/Terror" element={<Terror />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
