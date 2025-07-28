import { Button } from "semantic-ui-react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (prop: string) => {
    if (prop == "author") {
      navigate("/error");
      console.log("Autores");
    } else if (prop == "kids") {
      navigate("/error");
      console.log("kids");
    } else if (prop == "club") {
      navigate("/error");
      console.log("club");
    } else if (prop == "terror") {
      navigate("/Terror");
      console.log("shop");
    } else if (prop == "new") {
      navigate("/error");
      console.log("new");
    }
  };

  return (
    <>
      <Header />
      <div className="home-Body">
        <section className="Home-Cover">
          <img src="src/assets/images/librarybookshell.jpg" alt="Cover Book TEST" />
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
              onClick={() => handleClick("terror")}
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
              onClick={() => handleClick("author")}
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
            <Button onClick={() => handleClick("club")} className="buttonsHome">
              I want to be in the club
            </Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/640/250/270"
              alt="opn book in a table"
            />
            <h3>Join our club and have special discounts</h3>
            <Button onClick={() => handleClick("club")} className="buttonsHome">
              I want to be in the club
            </Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/630/250/270"
              alt="opn book in a table"
            />
            <h3>Join our club and have special discounts</h3>
            <Button onClick={() => handleClick("club")} className="buttonsHome">
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
                onClick={() => handleClick("kids")}
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
                onClick={() => handleClick("new")}
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
