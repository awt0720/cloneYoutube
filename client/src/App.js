import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import LandingPage from './components/views/LandingPage/LandingPage';
import Login from './components/views/LoginPage/Login';
import Register from './components/views/RegisterPage/Register';
import VideoUpload from './components/views/VideoUpload/VideoUpload'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(Login, false)} />
        <Route exact path="/register" component={Auth(Register, false)} />
        <Route exact path="/video/upload" component={Auth(VideoUpload, null)} />
      </Switch>
    </Router>
  );
}

export default App;
