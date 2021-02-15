import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthenticationContext } from '../ctx/authentication';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthenticationContext);
  console.log(user);
  return (
    <Route
      { ...rest }
      render={(props) => { user ? <Redirect to="/" /> : <Component {...props} /> }}
    />
  );
}

export default AuthRoute;