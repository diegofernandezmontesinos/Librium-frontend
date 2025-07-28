import "./Header.css";
import { Button } from "semantic-ui-react";
import GeolocationIcon from "../../assets/icons/geolocation";
import PersonFill from "../../assets/icons/personFill";
import ShoppingCar from "../../assets/icons/shoppingCar";
import MenuBar from "../menuBar/MenuBar";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "../languageSwitcher/languageSwitcher";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <header className="header-body">
      <div className="container-body">
        <div className="first-row-container">
          <p className="logo-title-header">La casa del libro</p>
          <input
            className="input-header"
            color="white"
            type="search"
            placeholder="Busca por título, autor, género, ISBN"
          ></input>
          <Button size="small" color="grey" className="buttonIcon-header">
            <GeolocationIcon />
            Librerías
          </Button>
          <LanguageSwitcher/>
          <Button
            onClick={handleClick}
            size="small"
            color="grey"
            className="buttonIcon-header"
          >
            <PersonFill />
            My Account
          </Button>
          <Button size="small" color="grey" className="buttonIcon-header">
            <ShoppingCar />
          </Button>
        </div>
        <div className="second-row-container">
          <MenuBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
