const API_URL = import.meta.env.VITE_API_URL;
const AUTH_PREFIX_SECTION = import.meta.env.VITE_AUTH_PREFIX_SECTION;
const BOOKS_PREFIX_SECTION = import.meta.env.VITE_BOOKS_PREFIX_SECTION;
const CART_PREFIX_SECTION = import.meta.env.VITE_CART_PREFIX_SECTION;

export const ApiPaths = {
  auth: {
    login: `${API_URL}${AUTH_PREFIX_SECTION}/login`,
    logout: `${API_URL}${AUTH_PREFIX_SECTION}/logout`,
    register: `${API_URL}${AUTH_PREFIX_SECTION}/register`,
  },
  books: {
    getAll: `${API_URL}${BOOKS_PREFIX_SECTION}/`, // GET
    getById: (id: number) => `${API_URL}${BOOKS_PREFIX_SECTION}/${id}`, // GET
    create: `${API_URL}${BOOKS_PREFIX_SECTION}/`, // POST
    update: (id: number) => `${API_URL}${BOOKS_PREFIX_SECTION}/${id}`, // PUT
    delete: (id: number) => `${API_URL}${BOOKS_PREFIX_SECTION}/${id}`, // DELETE
  },
  cart: {
    getByUser: (userId: number) => `${API_URL}${CART_PREFIX_SECTION}/${userId}`, // GET
    add: `${API_URL}${CART_PREFIX_SECTION}/`, // POST
    remove: (userId: number, bookId: number) =>
      `${API_URL}${CART_PREFIX_SECTION}/${userId}/remove/${bookId}`, // DELETE
    clear: (userId: number) =>
      `${API_URL}${CART_PREFIX_SECTION}/${userId}/clear`, // DELETE
  },
};
