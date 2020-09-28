import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import LandingPage from './components/views/LandingPage/LandingPage';
import Login from './components/views/LoginPage/Login';
import Register from './components/views/RegisterPage/Register';
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route path="/login" component={Auth(Login, false)} />
        <Route path="/register" component={Auth(Register, false)} />
      </Switch>
    </Router>
  );
}

export default App;
