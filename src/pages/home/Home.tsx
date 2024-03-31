import React from "react";
import "./Home.css";
import { Button } from "semantic-ui-react";

function Home() {
  return (
    <div className="home-Body">
      <section className="Home-Cover">
        <img
          src="https://picsum.photos/id/24/1080/270"
          alt="opn book in a table"
        />
      </section>
      <section className="three-articles-container">
        <article>
          <img
            src="https://picsum.photos/id/7/250/270"
            alt="opn book in a table"
          />
          <h3>Online shop, pick up at store</h3>
          <Button className="buttonsHome">See more</Button>
        </article>
        <article>
          <img
            src="https://picsum.photos/id/20/250/270"
            alt="opn book in a table"
          />
          <h3>Author's signed books</h3>
          <Button className="buttonsHome">See more</Button>
        </article>
        <article>
          <img
            src="https://picsum.photos/id/635/250/270"
            alt="opn book in a table"
          />
          <h3>Join our club and have special discounts</h3>
          <Button className="buttonsHome purple">
            I want to be in the club
          </Button>
        </article>
      </section>
      <div>
        <section></section>
        <section></section>
      </div>
    </div>
  );
}

export default Home;
