import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import AuthContext from './context/AuthContext';
import Dashboard from "./components/Dashboard";
import Game from "./components/Game";
import LoginPage from "./components/LoginPage";
import NavigationBar from "./components/NavigationBar";
import RegisterPage from "./components/RegisterPage";
import JoinGame from "./components/JoinGame";
import { PrivateRoute, ProtectedRoute } from "./components/Routes";

function App() {
  const [currentUser, setCurrentUser] = useState({ _id: window.sessionStorage.getItem("_id") , name: window.sessionStorage.getItem("name"), email: window.sessionStorage.getItem("email"), token: window.sessionStorage.getItem("token") });
  const value = {currentUser, setCurrentUser}

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <NavigationBar />
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <ProtectedRoute exact path="/game" component={Game} />
          <Route exact path="/join" component={JoinGame} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
