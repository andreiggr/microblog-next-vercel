'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const userSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

export interface UserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ApiError {
  code: string;
  title: string;
  detail: string;
  status: string;
  meta: {
    serviceId: string;
  };
}

const CreateUser = () => {
  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm, setErrors }: any
  ) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors && errorData.errors.length > 0) {
          const duplicatedUsernameError = errorData.errors.find(
            (error: any) => error.code === 'duplicatedUsername'
          );
          if (duplicatedUsernameError) {
            setErrors({ username: duplicatedUsernameError.detail });
          } else {
            setErrors({ submit: errorData.errors[0].detail });
          }
        }
      } else {
        resetForm();
      }
    } catch (error) {
      setErrors({ submit: 'Failed to connect to the server.' });
    }
    setSubmitting(false);
  };

  return (
    <>
      <h1>Create User</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          password: ''
        }}
        validationSchema={userSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="firstName" placeholder="First Name" />
            <ErrorMessage name="firstName" component="div" />

            <Field type="text" name="lastName" placeholder="Last Name" />
            <ErrorMessage name="lastName" component="div" />

            <Field type="text" name="username" placeholder="Username" />
            <ErrorMessage name="username" component="div" />

            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>

            <ErrorMessage name="submit" component="div" className="error" />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateUser;
