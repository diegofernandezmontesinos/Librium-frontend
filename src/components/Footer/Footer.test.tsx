import { fireEvent, render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("User", () => {
  test("renders component", () => {
    render(<Footer />);
    const isInside = screen.getByText(/footer/i)
    expect(isInside).toBeInTheDocument();
  });

  test("display new counter after one" , () => {
    render(<Footer />);
    const button = screen.getByText(/click/i, {selector: 'button'});
    fireEvent.click(button);
  })

});