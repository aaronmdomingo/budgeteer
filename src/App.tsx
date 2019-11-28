import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
