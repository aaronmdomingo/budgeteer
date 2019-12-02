import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LandingPage from './routes/landing-page/landing-page';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
         <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
