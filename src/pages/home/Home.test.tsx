import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("User", () => {
  test("renders component", () => {
    render(<Home />);
    const isInside = screen.getByText(/libros infantiles para celebrarlo/i)
    expect(isInside).toBeInTheDocument();
  });

});