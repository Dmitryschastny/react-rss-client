/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

import Form from '../Form';

const SignIn = () => {
  const signUpLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/signup" {...props} />
  ));

  const logInGuestLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/" {...props} />
  ));

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
      }}
      onSubmit={(values) => {

      }}
      title="Sign in"
      submitTitle="Sign in"
    >
      <div className="flexBetween">
        <Link component={logInGuestLink}>Log in as guest</Link>
        <Link component={signUpLink}>Sign up</Link>
      </div>
    </Form>
  );
};

export default SignIn;
