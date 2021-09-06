import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import LandingPage from './components/LandingPage/LandingPage';
import RegisterPage from './components/Register/RegisterPage';
import LoginPage from './components/Login/LoginPage';
import CreateGame from './components/CreateGame/CreateGame';
import JoinGame from './components/JoinGame/JoinGame';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          {/* <Navbar></Navbar> */}
                <Switch>
                    <Route   exact path="/"      component={LandingPage} />
                    <Route   exact path="/register"      component={RegisterPage} />
                    <Route   exact path="/login"     component={LoginPage}/>
                    {/* <Route   exact path="/home"      component={Home} />                   */}
                    <Route   exact path="/creategame"          component={CreateGame} />
                    <Route   exact path="/joingame"          component={JoinGame} />
                </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
