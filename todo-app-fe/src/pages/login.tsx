import AlertPopup from '@/components/alert';
import ErrorMessage from '@/components/errorMessage';
import { Color } from '@/types/alert-color';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
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
        if (response.status === 201) {
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
        <Card className='p-6'>
          <Typography
            variant='h4'
            color='blue-gray'
            className='mb-8 text-center'
          >
            Sign In To Your Account
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className='sm:mx-auto w-80'>
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
            <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
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
                    href='#'
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
            </div>
            <Button className='mt-6 flex w-full justify-center' type='submit'>
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
