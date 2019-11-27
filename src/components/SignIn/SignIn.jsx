/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Link } from '@material-ui/core';

import Form from '../Form/Form';

// const workWithDB = () => {
//   const request = window.indexedDB.open('RssFeedDatabase');

//   request.onupgradeneeded = (e) => {
//     const db = e.target.result;
//     const store = db.createObjectStore('users', { autoIncrement: true });

//     const addRequest = store.add({
//       email: 'guest',
//       isGuest: true,
//     });
//     store.add('kuks');

//     addRequest.onsuccess = ((e) => {
//       // debugger;

//       const getRequest = store.getAll();

//       getRequest.onsuccess = (e) => {
//         debugger;
//       };
//     });
//   };

//   request.onerror = (e) => {
//     console.log(2);
//     // Do something with request.errorCode!
//   };

//   request.onsuccess = (e) => {
//     console.log(3);
//   };
// };

const SignIn = () => {
  const signUpLink = React.forwardRef((props, ref) => (
    <RouterLink innerRef={ref} to="/signup" {...props} />
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
        <Link onClick={() => { }}>Log in as guest</Link>
        <Link component={signUpLink}>Sign up</Link>
      </div>
    </Form>
  );
};

export default SignIn;
