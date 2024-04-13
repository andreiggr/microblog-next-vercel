'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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
        router.push('/');
        resetForm();
      }
    } catch (error) {
      setErrors({ submit: 'Failed to connect to the server.' });
    }
    setSubmitting(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Create User</h1>
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
          <Form className="max-w-lg mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <div className="mb-4">
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <Field
                type="text"
                name="username"
                placeholder="Username"
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-6">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              Submit
            </button>

            <ErrorMessage
              name="submit"
              component="div"
              className="text-red-500 text-sm mt-2"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateUser;
