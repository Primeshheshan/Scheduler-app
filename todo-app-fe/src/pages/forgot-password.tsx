import {
  Button,
  Card,
  IconButton,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import * as Yup from 'yup';
import ErrorMessage from '@/components/errorMessage';
import useAlert from '@/hooks/alert.hook';
import axiosInstance from '@/api/axios';

const ForgotPassword = () => {
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();

  const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values: { email: string }) => {
      try {
        const response = await axiosInstance.post(
          'auth/sendmail',
          JSON.stringify({
            username: values.email,
          }),
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } catch (error: any) {
        const { message } = error.response.data;
        showAlert('Account creation failed!', `${message}`, 'red');
      }
      formik.resetForm();
    },
  });
  return (
    <div className='flex justify-center my-16'>
      <Card className='p-6'>
        <div className='flex items-center'>
          <IconButton variant='text' className='mr-1'>
            <Link href='/login'>
              <ChevronLeftIcon className='h-5 w-5 transition-transform group-hover:rotate-180' />
            </Link>
          </IconButton>
          <Typography variant='h4' color='blue-gray'>
            Forgot Password
          </Typography>
        </div>
        <Typography color='gray' className='mt-1 font-normal'>
          Enter your details to reset password.
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
          </div>

          <Button className='mt-6' fullWidth type='submit'>
            Send Reset Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
