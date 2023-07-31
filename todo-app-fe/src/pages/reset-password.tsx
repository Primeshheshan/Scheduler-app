import axiosInstance from '@/api/axios';
import AlertPopup from '@/components/alert';
import ErrorMessage from '@/components/errorMessage';
import useAlert from '@/hooks/alert.hook';
import { Color } from '@/types/alert-color';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Card,
  IconButton,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const ResetPassword = () => {
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();
  const router = useRouter();
  const resetPasswordSchema = Yup.object().shape({
    resetToken: Yup.string().required('Reset token is required'),
    newPassword: Yup.string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 8 chars minimum'),
  });

  const formik = useFormik({
    initialValues: {
      resetToken: '',
      newPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values: { resetToken: string; newPassword: string }) => {
      try {
        const response = await axiosInstance.post(
          'auth/reset-password',
          JSON.stringify({
            resetToken: values.resetToken,
            newPassword: values.newPassword,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response) {
          showAlert(
            'Password reset successfully!',
            `The password for your account has been successfully changed. Your account is now secured with the new password that you have set.`,
            'green'
          );
          router.push('/login');
        }
      } catch (error: any) {
        const { message } = error.response.data;
        showAlert('reset pasword failed!', `${message}`, 'red');
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
              <Link href='/forgot-password'>
                <ChevronLeftIcon className='h-5 w-5 transition-transform group-hover:rotate-180' />
              </Link>
            </IconButton>
            <Typography variant='h4' color='blue-gray'>
              Reset Password
            </Typography>
            <IconButton variant='text'>
              <div className='h-5 w-5' />
            </IconButton>
          </div>
          <Typography color='gray' className='mt-1 font-normal'>
            Reset your password.
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            className='mt-4 mb-2 w-80 max-w-screen-lg sm:w-96'
          >
            <div className='mb-4 flex flex-col gap-6'>
              <div>
                <Textarea
                  id='resetToken'
                  size='lg'
                  label='Reset Token'
                  required
                  name='resetToken'
                  onChange={formik.handleChange}
                  value={formik.values.resetToken}
                  error={formik?.errors.resetToken ? true : false}
                  className='focus:ring-0'
                />
                <ErrorMessage message={formik.errors.resetToken} />
              </div>
              <div>
                <Input
                  id='newPassword'
                  type='text'
                  size='lg'
                  label='New Password'
                  required
                  name='newPassword'
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  error={formik?.errors.newPassword ? true : false}
                  className='focus:ring-0'
                />
                <ErrorMessage message={formik.errors.newPassword} />
              </div>
            </div>

            <Button className='mt-6' fullWidth type='submit'>
              Reset Password
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

export default ResetPassword;
