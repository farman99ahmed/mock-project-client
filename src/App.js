import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import NavigationBar from "./components/NavigationBar";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
    </Router>
  );
}

export default App;
