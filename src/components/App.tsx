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
  const [currentMonth, setCurrentMonth ] = useState('');


  const logInUser = (user: string) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  }

  const setMonth = (month: string) => {
    setCurrentMonth(month);
  }

  return (
    <Router>
      <Switch>
        <Route exact path='/'>
         <LandingPage logInUser={logInUser} setMonth={setMonth}/>
        </Route>
        <Route path='/dashboard/:user/:monthName'>
          <Dashboard isLoggedIn={isLoggedIn} currentUser={currentUser} setMonth={setMonth} currentMonth={currentMonth}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
