import React from 'react';
import { Route as ReactDOMRoute, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

function Route({ isPrivate = false, component: Component, ...rest }) {
  const { authed } = useAuth();
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === authed ? (
          <Component />
        ) : (
            <Redirect to={{
              pathname: isPrivate ? '/login' : '/',
              state: { from: location }
            }} />
          )
      }}
    />
  );
};

export default Route;