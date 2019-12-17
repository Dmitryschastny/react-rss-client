/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  useFormik,
} from 'formik';
import { TextField, Button, Typography } from '@material-ui/core';

import styles from './Form.module.css';

interface Props {
  values: { [key: string]: string; };
  labels: { [key: string]: string; };
  onSubmit(values: Object): void;
  title: string;
  children: React.ReactChildren;
  submitTitle?: string;
  types: { [key: string]: string; };
}

const Form: React.FC<Props> = ({
  values,
  labels,
  onSubmit,
  title,
  children,
  submitTitle,
  types,
}) => {
  const formik = useFormik({
    initialValues: values,
    onSubmit,
    // validateOnChange: true,
    validate: (values: { [key: string]: string }) => {
      const errors: { [key: string]: string } = {};

      Object.keys(values).some(key => {
        if (values[key].length < 6) {
          errors[key] = 'Must be at least 6 chagarters!';
        }
      });

      console.log(errors);

      return errors;
    }
  });

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
      >
        <Typography variant="h3" component="h3">{title}</Typography>
        {Object.keys(values).map((key) => (
          <TextField
            className={styles.formItem}
            key={key}
            name={key}
            type={types && types[key] ? types[key] : 'text'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[key]}
            label={labels && labels[key] ? labels[key] : key}
            error={!!formik.errors[key] && formik.touched[key]}
            helperText={formik.touched[key] && formik.errors[key] || ''}
          />
        ))}
        <Button
          onClick={() => { formik.handleSubmit() }}
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

export default Form;
