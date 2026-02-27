import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import RegistrationPage from '../../pages/RegistrationPage';
import LoginPage from '../../pages/LoginPage';
import Dashboard from '../../pages/Dashboard';
import Play from '../../pages/Play';
import ProtectedRoute from './ProtectedRoute';
import StaticPage from '../../pages/StaticPage';
import NotFoundPage from '../../pages/NotFoundPage';
import staticPages from '../../data/staticPages';

const Routes = () => {

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={RegistrationPage} />
      <Route path="/login" component={LoginPage} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      {staticPages &&
        staticPages.map((page) => (
          <Route
            key={page.slug}
            path={`/${page.slug}`}
            component={() => (
              <StaticPage title={page.title} contentKey={page.contentKey} content={page.content} />
            )}
          />
        ))}
      <ProtectedRoute path="/play" component={Play} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
