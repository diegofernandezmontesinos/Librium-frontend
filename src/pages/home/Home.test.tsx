import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  BrowserRouter,
  useNavigate,
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Home";

jest.mock("../header/Header", () => () => <div>Mock Header</div>);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("User", () => {
  const mockNavigate = jest.fn();
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("renders component", () => {
    renderWithRouter(<Home />);
    const isInside = screen.getByText(/libros infantiles para celebrarlo/i);
    expect(isInside).toBeInTheDocument();
  });

  test.only("render the images", () => {
    renderWithRouter(<Home />);
    const coverImages = screen.getByAltText(/Cover Book TEST/i);
    expect(coverImages).toBeInTheDocument();
  });

  test("renders all images with alt attributes", () => {
    renderWithRouter(<Home />);

    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
    });
  });

  test("navigates to '/Terror' when 'Terror' button is clicked", async () => {
    renderWithRouter(<Home />);

    const terrorButton = screen.getByRole("button", { name: /See more/i });
    await userEvent.click(terrorButton);

    expect(mockNavigate).toHaveBeenCalledWith("/Terror");
  });

  test("navigates to '/error' when 'Author's signed books' button is clicked", async () => {
    renderWithRouter(<Home />);

    const authorButton = screen.getByRole("button", { name: /See more/i });
    await userEvent.click(authorButton);

    expect(mockNavigate).toHaveBeenCalledWith("/error");
  });

  test("renders Header and Footer components", () => {
    renderWithRouter(<Home />);

    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("navigates to the correct route when a button is clicked", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Terror" element={<div>Terror Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /See more/i });
    await userEvent.click(button);

    expect(screen.getByText("Terror Page")).toBeInTheDocument();
  });
});
