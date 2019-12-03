import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const date = new Date();
      const month = date.getMonth();
      const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = monthsArr[month];
    setCurrentMonth(monthName);
  }, []);

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
         <LandingPage logInUser={logInUser} currentMonth={currentMonth}/>
        </Route>
        <Route path='/dashboard/:user/:monthName'>
          <Dashboard isLoggedIn={isLoggedIn} currentUser={currentUser} setMonth={setMonth} currentMonth={currentMonth}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
