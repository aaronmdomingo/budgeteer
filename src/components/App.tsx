import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LandingPage from './routes/landing-page/landing-page';
import Dashboard from './routes/dashboard/dashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logInUser = (user: string) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
         <LandingPage logInUser={logInUser}/>
        </Route>
        <Route path='/dashboard/:user'>
          <Dashboard currentUser={currentUser} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
