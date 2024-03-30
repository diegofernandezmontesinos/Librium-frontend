import React from "react";
import "./Home.css";

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
        <article>Article 1</article>
        <article>Article 2</article>
        <article>Article 3</article>
      </section>
    </div>
  );
}

export default Home;
