import React, { useState, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import LandingPage from './routes/landing-page/landing-page';
import Dashboard from './routes/dashboard/dashboard';
import Register from './routes/register/register';
import Login from './routes/login/login';

export const UserContext = createContext({
  currentUser: ''
});

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logInUser = (user: string) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  const logOutUser = () => {
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
         <LandingPage logInUser={logInUser} isLoggedIn={isLoggedIn} logOutUser={logOutUser}/>
        </Route>
        <Route path='/dashboard/:user/:monthName'>
          <UserContext.Provider value={{ currentUser }}>
            <Dashboard isLoggedIn={isLoggedIn} />
          </UserContext.Provider>
        </Route>
        <Route path='/register'>
          <Register isLoggedIn={isLoggedIn}/>
        </Route>
        <Route path='/login'>
          <Login logInUser={logInUser} isLoggedIn={isLoggedIn} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
