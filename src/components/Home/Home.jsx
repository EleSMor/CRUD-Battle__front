import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {

  return (
    <>
      <div className="home">
        <div className="home__title">Welcome to CRUD Battle</div>
        <div className="home__container">
          <p className="home__text ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga, harum aliquid officiis, quis ipsa nulla
            laboriosam sapiente dolorum porro sed ratione autem quam nobis expedita sint dolorem eos tempora voluptates!
            Nam ipsam neque expedita quibusdam voluptate laudantium, esse dolor quidem perferendis soluta! Possimus,
            labore ad!
          </p>
        </div>
        <div>
          <Link className="home__start" to="/characters">
            <button className="home__button"> START GAME </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
