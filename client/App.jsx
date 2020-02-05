import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AuthRoute from './routes/AuthRoute';
import DashboardRoute from './routes/DashboardRoute';
import LandingPage from './pages/Landing';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Switch>
      <AuthRoute path='/auth' />
      <DashboardRoute path='/dashboard' />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/not-found' component={PageNotFound} />
      <Redirect from='*' to='/not-found' />
    </Switch>
  )
}

export default App;
