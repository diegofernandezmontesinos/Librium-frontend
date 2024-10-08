import { render, screen } from "@testing-library/react";
import Home from "./Home";

// Mockeamos el componente Header
jest.mock('../header/Header', () => () => <div>Mock Header</div>);

describe("User", () => {
  test("renders component", () => {
    render(<Home />);
    const isInside = screen.getByText(/libros infantiles para celebrarlo/i);
    expect(isInside).toBeInTheDocument();
  });

  test.only("render the images", () => {
    render(<Home />);
    const coverImages = screen.getByAltText(/Cover Book TEST/i);
    expect(coverImages).toBeInTheDocument();
  });
});