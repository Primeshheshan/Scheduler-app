import {
  Button,
  Card,
  IconButton,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import * as Yup from 'yup';
import ErrorMessage from '@/components/errorMessage';
import useAlert from '@/hooks/alert.hook';
import axiosInstance from '@/api/axios';
import AlertPopup from '@/components/alert';
import { Color } from '@/types/alert-color';

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
          'auth/forgot-password',
          JSON.stringify({
            username: values.email,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } catch (error: any) {
        const { message } = error.response.data;
        showAlert('Forgot password failed!', `${message}`, 'red');
      }
      formik.resetForm();
    },
  });
  return (
    <>
      <div className='flex justify-center my-16'>
        <Card className='p-6'>
          <div className='flex justify-between'>
            <IconButton variant='text'>
              <Link href='/login'>
                <ChevronLeftIcon className='h-5 w-5 transition-transform group-hover:rotate-180' />
              </Link>
            </IconButton>
            <Typography variant='h4' color='blue-gray'>
              Forgot Password
            </Typography>
            <IconButton variant='text'>
              <Link href='/reset-password'>
                <ChevronRightIcon className='h-5 w-5 transition-transform group-hover:rotate-180' />
              </Link>
            </IconButton>
          </div>
          <Typography color='gray' className='mt-1 font-normal'>
            Send reset token to your email
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

export default ForgotPassword;
