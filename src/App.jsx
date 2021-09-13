import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Register, Login, Characters, Battle, Navbar } from "./components";
import SelectCharacters from "./components/Context/SelectCharacters";
import AuthUser from "./components/Context/AuthUser";
import "./App.scss";

const App = () => {
  return (
    <Router>
      <AuthUser>
        <SelectCharacters>
          <Navbar/>
          <div className="app">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/register"
                component={(routerProps) => <Register {...routerProps} />}
              />
              <Route exact path="/login" component={() => <Login/>} />
              <Route exact path="/characters" component={Characters} />
              <Route exact path="/battle" component={Battle} />
            </Switch>
          </div>
        </SelectCharacters>
      </AuthUser>
    </Router>
  );
};

export default App;
