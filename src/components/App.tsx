import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LandingPage from './routes/landing-page';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={LandingPage} />
      </Switch>
    </Router>
  );
}

export default App;
