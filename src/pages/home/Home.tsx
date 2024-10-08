
import "./Home.css";
import { Button } from "semantic-ui-react";
import Header from "../header/Header";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Header />
      <div className="home-Body">
        <section className="Home-Cover">
          <img
            src="src/images/librarybookshell.jpg"
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
            <h3>Online shop, pick up at store</h3>
            <Button className="buttonsHome">See more</Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/20/250/270"
              alt="opn book in a table"
            />
            <h3>Author's signed books</h3>
            <Button className="buttonsHome">See more</Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/635/250/270"
              alt="opn book in a table"
            />
            <h3>Join our club and have special discounts</h3>
            <Button className="buttonsHome">I want to be in the club</Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/640/250/270"
              alt="opn book in a table"
            />
            <h3>Join our club and have special discounts</h3>
            <Button className="buttonsHome">I want to be in the club</Button>
          </article>
          <article className="TAC-img">
            <img
              src="https://picsum.photos/id/630/250/270"
              alt="opn book in a table"
            />
            <h3>Join our club and have special discounts</h3>
            <Button className="buttonsHome">I want to be in the club</Button>
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
              <Button className="buttonsHome">See more</Button>
            </p>
          </section>
          <section className="FAC-img">
            <p>
              Nuestras recomendaciones en el mes del libro
              <Button className="buttonsHome">See more</Button>
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
}

export default Home;
