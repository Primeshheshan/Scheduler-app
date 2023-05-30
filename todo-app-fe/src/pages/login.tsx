import AlertPopup from '@/components/alert';
import { Button } from '@material-tailwind/react';
import Card from '@/components/card';
import { Color } from '@/types/alert-color';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

const LoginPage = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    description: '',
    color: 'red',
  });

  const router = useRouter();

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
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/auth/login`,
          {
            username: values.email,
            password: values.password,
          }
        );
        if (response) {
          router.push('/');
        }
      } catch (error) {
        console.log(error);
        setOpenAlert(true);
        setAlert({
          message: 'Account creation failed!',
          description: 'Opps something went wrong, please try again!',
          color: 'red',
        });
      }

      formik.resetForm();
    },
  });
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
            <Button
              className='mt-6 flex w-full justify-center bg-indigo-600'
              type='submit'
            >
              Sign in
            </Button>
          </form>
        </Card>
        <AlertPopup
          open={openAlert}
          setOpen={setOpenAlert}
          message={alert.message}
          description={alert.description}
          color={alert.color as Color}
        />
      </div>
    </>
  );
};
export default LoginPage;
