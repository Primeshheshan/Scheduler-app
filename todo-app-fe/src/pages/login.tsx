import axios from '@/api/axios';
import AlertPopup from '@/components/alert';
import ErrorMessage from '@/components/errorMessage';
import useAlert from '@/hooks/alert.hook';
import { storeUsername } from '@/redux/auth.slice';
import { Color } from '@/types/alert-color';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const LoginPage = () => {
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();
  const dispatch = useDispatch();

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
          'auth/login',
          JSON.stringify({
            username: values.email,
            password: values.password,
          }),
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response) {
          const { accessToken } = response.data;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('accessToken', accessToken);
          const username = values.email.split('@')[0];
          dispatch(storeUsername(username));
          router.push('/');
        }
      } catch (error: any) {
        const { message } = error.response.data;
        showAlert('Account creation failed!', `${message}`, 'red');
        showAlert('Login failed!', `${message}`, 'red');
      }

      formik.resetForm();
    },
  });

  return (
    <>
      <div className='flex justify-center my-16'>
        <Card className='p-6'>
          <Typography variant='h4' color='blue-gray'>
            Sign In
          </Typography>
          <Typography color='gray' className='mt-1 font-normal'>
            Enter your credentials to register.
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            className='mt-4 mb-2 w-80 max-w-screen-lg sm:w-96'
          >
            <div className='mb-4 flex flex-col gap-6'>
              <div>
                <Input
                  id='email'
                  type='email'
                  size='lg'
                  label='Email'
                  required
                  name='email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik?.errors.email ? true : false}
                  className='focus:ring-0'
                />
                <ErrorMessage message={formik.errors.email} />
              </div>
              <div>
                <Input
                  id='password'
                  type='password'
                  size='lg'
                  label='Password'
                  required
                  name='password'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.errors.password ? true : false}
                  className='focus:ring-0'
                />
                <ErrorMessage message={formik.errors.password} />
                <div className='flex justify-end mt-1'>
                  <div className='text-xs'>
                    <Link
                      href='/forgot-password'
                      className='font-medium text-sm text-blue-500 transition-colors hover:text-blue-700'
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Button className='mt-6 flex w-full justify-center' type='submit'>
              Sign in
            </Button>
          </form>
          <Typography color='gray' className='mt-4 text-center font-normal'>
            Sign Up for free{' '}
            <Link
              href='/signup'
              className='font-medium text-blue-500 transition-colors hover:text-blue-700'
            >
              Sign Up
            </Link>
          </Typography>
        </Card>
      </div>
      <AlertPopup
        open={openAlert}
        setOpen={setOpenAlert}
        message={alert.message}
        description={alert.description}
        color={alert.color as Color}
      />
    </>
  );
};
export default LoginPage;
