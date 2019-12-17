/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { Link } from '@material-ui/core';

import Form from '../Form';

interface Props {
  error: string | null;
  onSubmit(email: string, password: string): void;
  isAuthorized: boolean;
}

const SignIn: React.FC<Props> = ({
  onSubmit,
  error,
  isAuthorized,
}) => {
  const signUpLink = React.forwardRef((props, ref: React.Ref<HTMLAnchorElement>) => (
    <RouterLink innerRef={ref} to="/signup" {...props} />
  ));

  const logInGuestLink = React.forwardRef((props, ref: React.Ref<HTMLAnchorElement>) => (
    <RouterLink innerRef={ref} to="/" {...props} />
  ));

  let location = useLocation();
  let history = useHistory();

  let { from } = location.state || { from: { pathname: "/" } };

  if (isAuthorized) {
    history.replace(from);
  }

  return (
    <Form
      values={{
        email: '',
        password: '',
      }}
      labels={{
        email: 'Email',
        password: 'Password',
      }}
      types={{
        email: 'email',
        password: 'password',
      }}
      onSubmit={(values: { email: string, password: string }) => {
        onSubmit(values.email, values.password);
      }}
      title="Sign in"
      submitTitle="Sign in"
      submitError={error}
    >
      <div className="flexBetween">
        <Link component={signUpLink}>Sign up</Link>
        <Link component={logInGuestLink}>Continue as guest</Link>
      </div>
    </Form>
  );
};

export default SignIn;
