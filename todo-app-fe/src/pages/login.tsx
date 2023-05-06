import { SuccessAlert } from '@/components/alerts';
import Button from '@/components/button';
import Card from '@/components/card';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const LoginPage = () => {
  const [isReqSuccess, setisReqSuccess] = useState(false);
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 8 chars minimum'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values: { email: string; password: string }) => {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/login`,
        {
          username: values.email,
          password: values.password,
        }
      );
      if (response.status === 201) setisReqSuccess(true);
      formik.resetForm();
    },
  });

  const resetForm = () => {};

  return (
    <>
      <div className='h-screen flex items-center justify-center'>
        <Card>
          <h2 className='mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900  '>
            Sign In To Your Account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className='sm:mx-auto w-80'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900 mb-2'
                >
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className='text-xs text-red-500 mt-1 font-semibold'>
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>
            <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900 mb-2'
                  >
                    Password
                  </label>
                  <div className='text-sm'>
                    <a
                      href='#'
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6'
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className='text-xs text-red-500 mt-1 font-semibold'>
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            <Button className='mx-auto mt-6' type='submit'>
              Sign in
            </Button>
          </form>
        </Card>
        {isReqSuccess && (
          <SuccessAlert
            message='User created successfully!'
            description='Congratulations, your account has been successfully created. Thank you for being awesome!'
          />
        )}
      </div>
    </>
  );
};
export default LoginPage;
