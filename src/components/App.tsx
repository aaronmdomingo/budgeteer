import React, { useState, createContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LandingPage from './routes/landing-page/landing-page';
import Dashboard from './routes/dashboard/dashboard';

export const UserContext = createContext({
  currentUser: '',
  currentMonth: '',
  setMonth: (e: any) => {}
});

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentMonth, setCurrentMonth ] = useState('');

  const logInUser = (user: string) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  const logOutUser = () => {
    setIsLoggedIn(false);
  }

  const setMonth = (month: string) => {
    setCurrentMonth(month);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
         <LandingPage logInUser={logInUser} setMonth={setMonth} isLoggedIn={isLoggedIn} logOutUser={logOutUser}/>
        </Route>
        <Route path='/dashboard/:user/:monthName'>
          <UserContext.Provider value={{ currentUser, currentMonth, setMonth }}>
            <Dashboard isLoggedIn={isLoggedIn} currentUser={currentUser} />
          </UserContext.Provider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
