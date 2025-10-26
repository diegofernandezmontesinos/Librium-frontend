// src/AppRoutes.tsx
import { Suspense, lazy, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { CartProvider } from "react-use-cart";

// LAZY PAGES / LAYOUTS
const GlobalLayout = lazy(() => import("./components/layouts/GlobalLayout"));
const Home = lazy(() => import("./pages/home/Home"));
const LogIn = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/register/Register"));
const ErrorPage = lazy(() => import("./pages/error/ErrorPage"));
const Terror = lazy(() => import("./pages/sections/Terror"));
const Tech = lazy(() => import("./pages/sections/TechnicalBooksPage"));
const Fiction = lazy(() => import("./pages/sections/FictionPage"));
const Kids = lazy(() => import("./pages/sections/KidsPage"));
const History = lazy(() => import("./pages/sections/HistoryPage"));
const BooksPage = lazy(() => import("./components/booksPage/BooksPage"));

// PROTECTED ROUTES
import ProtectedRoutes from "./utils/protectedRoutes/ProtectedRoutes";
import { CartSummary } from "./components/shoppingCart/cartSummary/CartSummary";
import PersonalArea from "./components/personalArea/PersonalArea";

// ----------------- UI LOADING -----------------
function Fallback() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;

  return (
    <div
      style={{
        padding: 24,
        minHeight: "50vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div className="flex items-center justify-center gap-2">
        <svg
          className="animate-spin h-10 w-10 text-primaryColor"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <span className="text-primaryColor text-lg font-medium">
          Cargando...
        </span>
      </div>
    </div>
  );
}

// ----------------- LAYOUTS -----------------
function PublicLayout() {
  return <Outlet />;
}

// ----------------- ROUTER -----------------
const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Fallback />}>
        <GlobalLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Fallback />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      // PUBLIC ROUTES
      {
        element: <PublicLayout />,
        children: [
          { path: "/login", element: <LogIn /> },
          { path: "/register", element: <Register /> },
          { path: "/", element: <Home /> },
          { path: "/terror", element: <Terror /> },
          { path: "/fiction", element: <Fiction /> },
          { path: "/tech", element: <Tech /> },
          { path: "/kids", element: <Kids /> },
          { path: "/history", element: <History /> },
        ],
      },
      // PROTECTED ROUTES
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "books-page", element: <BooksPage /> },
          { path: "my-cart", element: <CartSummary /> },
          { path: "personal-area", element: <PersonalArea /> },
        ],
      },
      // FALLBACK
      { path: "/*", element: <ErrorPage /> },
    ],
  },
]);

// ----------------- COMPONENT EXPORT -----------------
const AppRoutes: React.FC = () => (
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);

export default AppRoutes;
