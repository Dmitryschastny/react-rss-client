/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

import Form from '../Form';

const SignIn = () => {
  const signInLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/signin" {...props} />
  ));

  return (
    <Form
      values={{
        email: '',
        password: '',
        repeatPassword: '',
      }}
      labels={{
        email: 'Email',
        password: 'Password',
        repeatPassword: 'Repeat password',
      }}
      // onSubmit={(values) => {

      // }}
      title="Sign up"
      submitTitle="Create an account"
    >
      <Link component={signInLink} className="flexEnd">Sign in</Link>
    </Form>
  );
};

export default SignIn;
