import { Button } from "semantic-ui-react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { HomeEnum } from "./HomeTypes";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (section: HomeEnum) => {
    if (section === HomeEnum.AUTHOR) {
      navigate("/error");
    } else if (section === HomeEnum.KIDS) {
      navigate("/error");
    } else if (section == HomeEnum.CLUB) {
      navigate("/error");
    } else if (section === HomeEnum.TERROR) {
      navigate("/Terror");
    } else if (section === HomeEnum.NEW) {
      navigate("/error");
    }
  };

  return (
    <>
      <Header />
      <div className="home-Body">
        <section className="Home-Cover">
          <img
            src="src/assets/images/librarybookshell.jpg"
            alt="Cover Book TEST"
          />
        </section>
        <div className="lineal-section">
          <p>Explore the world</p>
        </div>
        <section className="mid-articles-container">
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/7/250/270"
              alt="opn book in a table"
            />
            <h3>Terror</h3>
            <Button
              onClick={() => handleClick(HomeEnum.TERROR)}
              className="buttonsHome"
            >
              See more
            </Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/20/250/270"
              alt="opn book in a table"
            />
            <h3>Author's signed books</h3>
            <Button
              onClick={() => handleClick(HomeEnum.AUTHOR)}
              className="buttonsHome"
            >
              See more
            </Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/635/250/270"
              alt="opn book in a table"
            />
            <h3>Join our club and have special discounts</h3>
            <Button
              onClick={() => handleClick(HomeEnum.CLUB)}
              className="buttonsHome"
            >
              I want to be in the club
            </Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/640/250/270"
              alt="opn book in a table"
            />
            <h3>Join our club and have special discounts</h3>
            <Button
              onClick={() => handleClick(HomeEnum.CLUB)}
              className="buttonsHome"
            >
              I want to be in the club
            </Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/630/250/270"
              alt="opn book in a table"
            />
            <h3>Join our club and have special discounts</h3>
            <Button
              onClick={() => handleClick(HomeEnum.CLUB)}
              className="buttonsHome"
            >
              I want to be in the club
            </Button>
          </article>
        </section>
        <div className="footer-articles-container">
          <section className="FAC-img">
            {" "}
            <img
              src="https://picsum.photos/id/63/100/190"
              alt="opn book in a table"
            />
            <p>
              Libros infantiles para celebrarlo
              <Button
                onClick={() => handleClick(HomeEnum.KIDS)}
                className="buttonsHome"
              >
                See more
              </Button>
            </p>
          </section>
          <section className="FAC-img">
            <p>
              Nuestras recomendaciones en el mes del libro
              <Button
                onClick={() => handleClick(HomeEnum.NEW)}
                className="buttonsHome"
              >
                See more
              </Button>
            </p>
            <img
              src="https://picsum.photos/id/63/100/190"
              alt="opn book in a table"
            />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
