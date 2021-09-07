import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import AuthContext from './context/AuthContext';
import Dashboard from "./components/Dashboard";
import Game from "./components/Game";
import LoginPage from "./components/LoginPage";
import NavigationBar from "./components/NavigationBar";
import RegisterPage from "./components/RegisterPage";

function App() {
  const [currentUser, setCurrentUser] = useState({ _id: "78793415-3017-451f-8183-ebda2c5fbbcf", name: null, email: null, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI3ODc5MzQxNS0zMDE3LTQ1MWYtODE4My1lYmRhMmM1ZmJiY2YiLCJlbWFpbCI6ImZhcm1hbkBmYXJtYW4uY29tIiwiaWF0IjoxNjMwOTkwOTg4LCJleHAiOjE2MzA5OTQ1ODh9.vDDREvHf5uwSlZuzgdooEGANWjcWj3e10IrJHkBK2D0" });
  const value = {currentUser, setCurrentUser}

  return (
    <AuthContext.Provider value={value}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
