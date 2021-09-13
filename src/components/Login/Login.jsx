import React, { useContext, useState } from "react";
import { UserContext } from "../Context/AuthUser";
import { useHistory } from "react-router-dom";
import { loginApi } from "../../api/auth.api";
import "./Login.scss";
import storage from "../../services/storage";

const Login = () => {
  const { storeUser } = useContext(UserContext)
  const history = useHistory();

  const [error, setError] = useState("");

  const submitForm = async (ev) => {
    ev.preventDefault();
    setError("");

    try {
      const { alias, password } = ev.target;
      const form = {
        alias: alias.value,
        password: password.value,
      };

      const user = await loginApi(form);
      storeUser(user);
      history.push("/");
      storage.set('user', user);
      const INITIAL_IA = {name: "ia", characters: []};
      storage.set('ia', INITIAL_IA);
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="login">
      <form className="login__form" onSubmit={submitForm}>
        <h1 className="login__title">Welcome</h1>
        <input
          className="login__input"
          type="text"
          name="alias"
          placeholder="Alias"
          required
        />

        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button className="login__button">Login</button>
        <div className="login__register">
          <a href="/register">Don't have an account? Sign up</a>
        </div>
        <div className="login__back">
          <a href="/">Back home</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
