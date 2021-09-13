import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKhanda } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../api/auth.api";
import { UserContext } from "../Context/AuthUser";
import "./Navbar.scss";

const Navbar = () => {
  const { user, storeUser } = useContext(UserContext);
  const [error, setError] = useState();
  const history = useHistory();

  const logoutUser = async (ev) => {
    ev.preventDefault();
    setError("");

    try {
      await logout();
      history.push("/");
      storeUser(null);
    } catch (error) {
      console.log("Error en el register: ", error);
      setError(error.message);
    }
  };

  return (
    <nav className="nav">
      <div className="nav__title" onClick={() => history.push("/")}>
        <p className="nav__icon">
          <FontAwesomeIcon icon={faKhanda} />
        </p>
        <p className="left"> CRUD </p>
        <p className="right"> BATTLE </p>
      </div>
      <div className="nav__container">
        <ul className="nav__list">
          <li>
            <Link className="nav__link" to="/">
              Home
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link className="nav__link" to="/characters">
                  Characters
                </Link>
              </li>
              <li>
                <Link className="nav__link" to="/battle">
                  Battle
                </Link>
              </li>
              <div className="nav__logout" onClick={logoutUser}>
                Logout
              </div>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link className="nav__link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="nav__link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
