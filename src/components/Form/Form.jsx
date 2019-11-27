/* eslint-disable react/jsx-props-no-spreading */
import React, { Children } from 'react';
import {
  useFormik,
} from 'formik';
import { TextField, Button, Typography } from '@material-ui/core';

import styles from './Form.module.css';

export default function Form({
  values,
  labels,
  onSubmit,
  title,
  children,
  submitTitle,
  types,
}) {
  const formik = useFormik({
    initialValues: values,
    onSubmit,
  });

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h3" component="h3">{title}</Typography>
        {Object.keys(values).map((key) => (
          <TextField
            className={styles.formItem}
            key={key}
            name={key}
            type={types && types[key] ? types[key] : 'text'}
            onChange={formik.handleChange}
            value={formik.values[key]}
            label={labels && labels[key] ? labels[key] : key}
          />
        ))}
        <Button
          onClick={() => { }}
          color="primary"
          variant="contained"
          className={`${styles.submitButton} ${styles.formItem}`}
        >
          {submitTitle || 'Submit'}
        </Button>
        {children}
      </form>
    </div>
  );
}
