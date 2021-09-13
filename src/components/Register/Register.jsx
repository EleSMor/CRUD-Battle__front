import React, { Fragment, useState, useContext } from "react";
import { UserContext } from "../Context/AuthUser";
import { useHistory } from "react-router-dom";
import { registerApi } from "../../api/auth.api";
import "./Register.scss";

const INITIAL_STATE = {
  name: "",
  password: "",
  email: "",
  alias: "",
};

const Register = () => {
  const { storeUser } = useContext(UserContext);
  const [registerForm, setRegisterForm] = useState(INITIAL_STATE);
  const [error, setError] = useState();
  const history = useHistory();

  const submitForm = async (ev) => {
    ev.preventDefault();
    setError("");

    try {
      const user = await registerApi(registerForm);
      storeUser(user);
      history.push('/');
    } catch (error) {
      console.log("Error en el register: ", error);
      setError(error.message);
    }
  };
  const handleInput = (ev) => {
    const { name, value } = ev.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };
  return (
    <Fragment>
      <div className="register">
        <form className="register__form" onSubmit={submitForm}>
          <input
            className="register__input"
            type="text"
            name="name"
            value={registerForm.name}
            onChange={handleInput}
            placeholder="Name"
            required
          />
          <input
            className="register__input"
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleInput}
            placeholder="Password"
            required
          />

          <input
            className="register__input"
            type="email"
            name="email"
            value={registerForm.email}
            onChange={handleInput}
            placeholder="Email"
            required
          />

          <input
            className="register__input"
            type="text"
            name="alias"
            value={registerForm.alias}
            onChange={handleInput}
            placeholder="Alias"
            required
          />
          <button type="submit" className="register__button">
            Sign up
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
