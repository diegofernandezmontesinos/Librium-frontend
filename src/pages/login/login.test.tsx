import { render, screen } from "@testing-library/react";
import LogIn from "./login";

describe("Test to render the login component", () => {
    test("should find the user input", () => {
        render(<LogIn />)
        const isInside = screen.getByPlaceholderText(/Nombre de usuario/i)
        expect(isInside).toBeInTheDocument();
    })
    test("should find the password input", () => {
        render(<LogIn />)
        const isInside = screen.getByPlaceholderText(/Contraseña/i)
        expect(isInside).toBeInTheDocument();
    })
})

